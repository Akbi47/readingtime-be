import { Document } from 'mongoose';

export interface CustomerServiceMobile extends Document {
  readonly Id: number;
  readonly Customer_Service_Mobile_Name: string;
}
