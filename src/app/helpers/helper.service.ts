import { Injectable } from '@angular/core';
import { OpenNativeSettings } from '@ionic-native/open-native-settings/ngx';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  constructor(
    private alertController: AlertController,
    private openNativeSettings: OpenNativeSettings
  ) {}

  getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371;
    var dLat = this.deg2rad(lat2 - lat1);
    var dLon = this.deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d.toFixed(2);
  }

  deg2rad(deg: number) {
    return deg * (Math.PI / 180);
  }

  async openSettingAlert({ title, desc, setting_type }) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: title,
      message: desc,
      buttons: [
        {
          text: 'İptal',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {},
        },
        {
          text: 'Aç',
          handler: () => {
            this.openNativeSettings.open(setting_type);
          },
        },
      ],
    });

    await alert.present();
  }
}
