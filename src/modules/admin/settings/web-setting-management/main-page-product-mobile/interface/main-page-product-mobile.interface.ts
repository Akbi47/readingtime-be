import { Document } from 'mongoose';

export interface MainPageProductMobile extends Document {
  readonly Id: number;
  readonly MainPage_Product_Mobile_Name: string;
  readonly Display: boolean;
}
