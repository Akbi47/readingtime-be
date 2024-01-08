import { Document } from 'mongoose';

export interface PrivacyPolicy extends Document {
  readonly Id: number;
  readonly Title: string;
  readonly Text_Field: string;
  readonly Country: string;
}
