import { Component, Input, OnInit } from '@angular/core';
import { HelperService } from 'src/app/helpers/helper.service';
import { Restaurant } from 'src/app/interfaces/restaurant';



@Component({
  selector: 'app-restaurant-card',
  templateUrl: './restaurant-card.component.html',
  styleUrls: ['./restaurant-card.component.scss'],
})
export class RestaurantCardComponent implements OnInit {
  constructor(private helperService: HelperService) {}

  ngOnInit() {
    
  }

  @Input()
  restaurant: Restaurant;

  @Input()
  index:number;

  @Input()
  userLocation;


  calcOpenOrClosed() {
    return  this.index % 2 == 0;
  }


  calculateDistance() {
    if(this.userLocation) {
      const userLat = this.userLocation.latitude;
      const userLon = this.userLocation.longitude;
      const restLat = this.restaurant.storeInfo.geoLocation.latitude;
      const restLon = this.restaurant.storeInfo.geoLocation.longitude;
      return this.helperService.getDistanceFromLatLonInKm(userLat,userLon,restLat,restLon);
    }
  }

}
