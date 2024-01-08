import { Document } from 'mongoose';

export interface Category extends Document {
  readonly Category_Name: string;
  readonly Type: boolean;
}
