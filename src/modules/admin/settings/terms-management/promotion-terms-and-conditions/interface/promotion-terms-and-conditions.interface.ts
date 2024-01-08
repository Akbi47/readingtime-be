import { Document } from 'mongoose';

export interface PromotionTermsAndConditions extends Document {
  readonly Id: number;
  readonly Title: string;
  readonly Text_Field: string;
  readonly Country: string;
}
