import { Document } from 'mongoose';

export interface MenuPermissionManagement extends Document {
  readonly Role: string;
  readonly Slug: string;
  readonly Apply: boolean;
}
