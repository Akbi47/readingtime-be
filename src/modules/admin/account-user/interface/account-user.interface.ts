import { Document } from 'mongoose';

export interface AccountUser extends Document {
  readonly User_Name: string;
  readonly User_English_Name: string;
  readonly Email: string;
  readonly Password: string;
  readonly Gender: boolean;
  readonly Birth: Date;
  readonly Country: string;
  readonly Description: string;
  readonly Picture: string;
  readonly Admission: string[];
  readonly List_of_Tags: string[];
  readonly English_Wing_Member: string[];
  readonly Referal_Code: string;
  readonly Signup_Path: string;
  readonly Course: number;
  readonly Billing: number;
  readonly Role: string;
}
