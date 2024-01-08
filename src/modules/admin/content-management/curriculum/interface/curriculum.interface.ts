import { Document } from 'mongoose';

export interface Curriculum extends Document {
  readonly Unique_No: string;
  readonly Curriculum_Title: string;
  readonly Subtitle: string;
  readonly Division: string;
  readonly _Description: string;
  readonly Whether_To_Use: boolean;
  readonly Book_Id: string;
}
