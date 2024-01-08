import { Document } from 'mongoose';

export interface PointPenaltyManagement extends Document {
  readonly Teacher_Name: string;
  readonly Division: boolean;
  readonly Items: string;
  readonly Texts: string;
}
