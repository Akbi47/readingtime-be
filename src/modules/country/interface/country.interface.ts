import { Document } from 'mongoose';

export interface Country extends Document {
  readonly code: string;
  readonly name: string;
}
