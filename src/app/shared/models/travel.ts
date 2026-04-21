export enum TravelStatus {
  Available = 'Доступно',
  SoldOut = 'Продано',
  ComingSoon = 'Очікується',
}

export interface Location {
  country: string;
  region: string;
}

export interface Travel {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  startDate: Date;
  status: TravelStatus;
  tags: string[];
  location: Location;
}
