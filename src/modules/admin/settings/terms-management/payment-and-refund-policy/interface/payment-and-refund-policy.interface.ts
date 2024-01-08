import { Document } from 'mongoose';

export interface PaymentAndRefundPolicy extends Document {
  readonly Id: number;
  readonly Title: string;
  readonly Text_Field: string;
  readonly Country: string;
}
