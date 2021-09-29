import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { RestaurantListComponent } from '../components/restaurant-list/restaurant-list.component';
import { RestaurantCardComponent } from '../components/restaurant-list/restaurant-card/restaurant-card.component';
import { HeaderComponent } from '../components/header/header.component';
import { ContentComponent } from '../components/content/content.component';
import { SearchBoxComponent } from '../components/search-box/search-box.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, HomePageRoutingModule],
  declarations: [
    HomePage,
    RestaurantListComponent,
    RestaurantCardComponent,
    HeaderComponent,
    ContentComponent,
    SearchBoxComponent
  ],
})
export class HomePageModule {}
