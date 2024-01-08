import { Document } from 'mongoose';

export interface CustomerServicePC extends Document {
  readonly Id: number;
  readonly Customer_Service_PC_Name: string;
}
