import { Document } from 'mongoose';

export interface HolidayManagement extends Document {
  readonly _Name: string;
  readonly _Start_Date: Date;
  readonly End_Date: Date;
  readonly Annual_Repeat: boolean;
  readonly Usage_Status: boolean;
  readonly Registration_Date: Date;
  readonly Country: string;
}
