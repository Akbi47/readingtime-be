import { Document } from 'mongoose';

export interface RoleManagement extends Document {
  readonly _Name: string;
  readonly Nickname: string;
  readonly Email: string;
  readonly Password: string;
  readonly Gender: boolean;
  readonly Birth: Date;
  readonly Country: string;
  readonly Contract_Type: string;
  readonly _Contract: string;
  readonly _Start_Date: Date;
  readonly Registration_Date: Date;
  readonly Authority_Type: string;
  readonly _Image: string;
  readonly Role: string;
}
