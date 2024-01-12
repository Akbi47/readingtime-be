import { Document } from 'mongoose';

export interface RegularProduct extends Document {
  readonly Product_Name: string;
  readonly Description: string;
  readonly Curriculum_Name: string;
  readonly Country_Name: string;
  readonly Currency: string;
  readonly Class_Days: number;
  readonly Price: number;
  readonly Discount_Price: number;
  readonly Study_Time: number;
  readonly About_Product: string;
  readonly Image: string;
}
