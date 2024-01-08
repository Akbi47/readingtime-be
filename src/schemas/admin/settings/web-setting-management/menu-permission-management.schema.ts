import * as mongoose from 'mongoose';

export const MenuPermissionManagementSchema = new mongoose.Schema(
  {
    Role: String,
    Slug: String,
    Apply: Boolean,
  },
  { timestamps: true },
);
