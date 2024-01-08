import { Document } from 'mongoose';

export interface WebSettings extends Document {
  readonly Id: number;
  readonly Title: string;
  readonly Tagline: string;
}
