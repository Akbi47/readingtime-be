import * as mongoose from 'mongoose';

export const BoardSupportSchema = new mongoose.Schema(
  {
    Name: String,
    Email: String,
    Category: String,
    Title: String,
    Status: Boolean,
    Time: Date,
  },
  { timestamps: true },
);
