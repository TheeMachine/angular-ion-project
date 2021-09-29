import { Component, OnInit, ViewChild } from '@angular/core';
import {
  AlertController,
  IonVirtualScroll,
  ToastController,
} from '@ionic/angular';
import { Filter } from 'src/app/interfaces/filter';
import { Restaurant } from 'src/app/interfaces/restaurant';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { Geolocation } from '@capacitor/geolocation';
import { OpenNativeSettings } from '@ionic-native/open-native-settings/ngx';
import { HelperService } from 'src/app/helpers/helper.service';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.scss'],
})
export class RestaurantListComponent implements OnInit {
  constructor(
    private restaurantService: RestaurantService,
    public toastController: ToastController,
    private openNativeSettings: OpenNativeSettings,
    public alertController: AlertController,
    private helperService: HelperService
  ) {
    this.getList();
  }

  restaurants: Restaurant[] = [];
  loading: boolean = true;
  isEnd: boolean = false;

  @ViewChild(IonVirtualScroll) virtualScroll: IonVirtualScroll;

  ngOnInit() {}

  userLocation;

  first = true;

  async getList() {
    this.loading = true;
    this.restaurants = [];
    try {
      const { coords } = await Geolocation.getCurrentPosition();
      this.userLocation = coords;
      let filter = {
        latitude: coords.latitude,
        longitude: coords.longitude,
        limit: 5,
        skip: this.restaurants.length,
      };
      this.restaurantService
        .getRestaurants(filter)
        .then(({ data }) => {
          this.restaurants = JSON.parse(data).response;
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
        });
    } catch (error) {
      this.loading = false;
      if (!this.first && String(error).indexOf('permission was denied') >= 0) this.openSetting();
      if (!this.first && String(error).indexOf('location unavailable') >= 0) this.openLocation();
      this.first = false;
    }
  }

  async openLocation() {
    await this.helperService.openSettingAlert({
      title: 'Konum',
      desc: 'Konumu açmak ister misiniz?',
      setting_type: 'location',
    });
  }

  async openSetting() {
    await this.helperService.openSettingAlert({
      title: 'Konum İzni',
      desc: 'Konum iznini ayarlardan açmak ister misiniz?',
      setting_type: 'application_details',
    });
  }

  loadData(event) {
    let filter: Filter = {
      latitude: this.userLocation?.latitude,
      longitude: this.userLocation?.longitude,
      limit: 5,
      skip: this.restaurants.length,
    };
    this.restaurantService
      .getRestaurants(filter)
      .then(({ data }) => {
        let res = JSON.parse(data).response;
        if (res.length > 0) {
          this.restaurants.push(...res);
        } else {
          this.isEnd = true;
        }
        event.target.complete();
        this.virtualScroll.checkEnd();
      })
      .catch((err) => {
        alert('Bir Sorun Oluştu');
      });
  }  
}
