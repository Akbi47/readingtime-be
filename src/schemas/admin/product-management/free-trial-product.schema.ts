import * as mongoose from 'mongoose';

export const FreeTrialProductSchema = new mongoose.Schema(
  {
    Product_Name: String,
    Description: String,
    Curriculum_Name: String,
    Country_Name: String,
    Currency: String,
    Study_Time: Number,
    About_Product: String,
    Image: String,
  },
  { timestamps: true },
);
