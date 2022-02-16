import { User } from "./Authentication";

export interface IOpinion {
  id: number;
  rate: number;
  content: string;
  date: Date;
  author: User;
}

export interface IAddOpinion {
  rate: number;
  content: string;
  offer: number;
}

export type PropertyType = "HOME" | "HOSTEL" | "APARTMENT" | "HOTEL" | undefined;

export interface Offer {
  id: number;
  title: string;
  city: string;
  maxPeople: number;
  description: string;
  dailyPrice: number;
  type: PropertyType;
  images: { url: string }[];
  owner: User;
  opinions: IOpinion[];
  smoking: boolean;
  ratings: {
    opinionsCount: number;
    rateCount: number;
  };
}

export interface Image extends File {
  preview: string;
}

export interface IaddOffer {
  title: string;
  city: string;
  maxPeople: number;
  description: string;
  dailyPrice: number;
  type: PropertyType;
  smoking: boolean;
}

export interface IaddOfferWithPhotos extends IaddOffer {
  photos: Blob[];
}

export interface Reservation {
  startDate: string,
  endDate: string,
}

export interface UserReservation extends Reservation {
  id: number;
  price: number;
  offer: Offer;
}

export interface Ifilters {
  price: number[];
  smoking: boolean;
  apartment: boolean;
  hotel: boolean;
  hostel: boolean;
  home: boolean;

}


