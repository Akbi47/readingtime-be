import { Document } from 'mongoose';

export interface BoardSupport extends Document {
  readonly Name: string;
  readonly Email: string;
  readonly Category: string;
  readonly Title: string;
  readonly Status: boolean;
  readonly Time: Date;
}
