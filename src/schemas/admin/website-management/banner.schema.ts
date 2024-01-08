import * as mongoose from 'mongoose';

export const BannerSchema = new mongoose.Schema(
  {
    Banner_Type: String,
    Status: Boolean,
    Banner_Name: String,
    Image: String,
    Link_Path: String,
    Period: String,
    Type: String,
  },
  { timestamps: true },
);
