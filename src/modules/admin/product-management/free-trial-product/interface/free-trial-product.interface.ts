import { Document } from 'mongoose';

export interface FreeTrialProduct extends Document {
  readonly Product_Name: string;
  readonly Description: string;
  readonly Curriculum_Name: string;
  readonly Country_Name: string;
  readonly Currency: string;
  readonly Study_Time: number;
  readonly About_Product: string;
}
