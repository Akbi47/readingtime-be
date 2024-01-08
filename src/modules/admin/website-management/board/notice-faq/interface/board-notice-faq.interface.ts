import { Document } from 'mongoose';

export interface BoardNoticeFAQ extends Document {
  readonly Category: string;
  readonly Title: string;
  readonly Status: boolean;
  readonly Time: Date;
  readonly Image: string;
  readonly Url_Slug: string;
  readonly Content: string;
  readonly Type: boolean;
}
