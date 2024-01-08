import * as mongoose from 'mongoose';

export const WebSettingsSchema = new mongoose.Schema(
  {
    Id: Number,
    Title: String,
    Tagline: String,
  },
  { timestamps: true },
);
