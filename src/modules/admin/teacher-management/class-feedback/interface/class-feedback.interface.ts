import { Document } from 'mongoose';

export interface ClassFeedback extends Document {
  readonly Team_Name: string;
  readonly Teacher_Name: string;
  readonly Student_Name: string;
  readonly Class_Datetime: Date;
  readonly Video: string;
  readonly TL_Feedback: string;
  readonly Score: number;
  readonly Teacher_Comment: string;
}
