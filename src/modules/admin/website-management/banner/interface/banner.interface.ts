import { Document } from 'mongoose';

export interface Banner extends Document {
  readonly Banner_Type: string;
  readonly Status: boolean;
  readonly Banner_Name: string;
  readonly Image: string;
  readonly Link_Path: string;
  readonly Period: string;
  readonly Type: string;
}
