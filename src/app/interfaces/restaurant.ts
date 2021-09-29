export interface Restaurant {
  id?: string;
  title?: string;
  text?: string;
  type?: string;
  images?: Image[];
  location?: Location;
  isDinner?: boolean;
  isDelivery?: boolean;
  storeInfo?: StoreInfo;
  categoryId?: string;
}

interface StoreInfo {
  id?: string;
  geoLocation?: GeoLocation;
  userPoint?: number;
  workingHours?: WorkingHour[];
  status?: string;
  rate?: number;
  minOrderPrice?: number;
}

interface WorkingHour {
  day?: number;
  open?: string;
  close?: string;
  closed?: boolean;
}

interface GeoLocation {
  approve?: boolean;
  latitude?: number;
  longitude?: number;
}

interface Location {
  type?: string;
  coordinates?: number[];
}

interface Image {
  itemType?: string;
  itemId?: string;
  imageSize?: string;
  base64?: string;
  storeId?: string;
}
