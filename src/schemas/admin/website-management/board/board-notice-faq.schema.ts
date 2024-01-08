import * as mongoose from 'mongoose';

export const BoardNoticeFAQSchema = new mongoose.Schema(
  {
    Category: String,
    Title: String,
    Status: Boolean,
    Time: Date,
    Image: String,
    Url_Slug: String,
    Content: String,
    Type: Boolean,
  },
  { timestamps: true },
);
