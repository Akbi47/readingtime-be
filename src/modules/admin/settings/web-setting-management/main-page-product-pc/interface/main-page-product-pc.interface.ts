import { Document } from 'mongoose';

export interface MainPageProductPC extends Document {
  readonly Id: number;
  readonly MainPage_Product_PC_Name: string;
  readonly Display: boolean;
}
