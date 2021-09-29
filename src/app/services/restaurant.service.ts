import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { environment } from 'src/environments/environment';
import { Filter } from '../interfaces/filter';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  apiUrl = environment.apiUrl; // Get ApiUrl from environment
  token = environment.token; // Get token from environment

  defaultFilter: Filter = { // Default Filter Options
    skip: 0,
    limit: 5,
    latitude: 0,
    longitude: 0,
  };

  constructor(private http: HTTP) {}

  async getRestaurants(options?: Filter) {
    if (!options) options = this.defaultFilter; // if options is false, set by default.

    this.http.setDataSerializer('json'); // Content-Type set to Json

    return this.http.post(this.apiUrl, options, {
      'Content-Type': 'application/json',
      apiKey: this.token,
    });
  }
}
