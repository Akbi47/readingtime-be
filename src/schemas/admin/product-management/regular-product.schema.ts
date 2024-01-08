import * as mongoose from 'mongoose';

export const RegularProductSchema = new mongoose.Schema(
  {
    Product_Name: String,
    Product_Division: String,
    Description: String,
    Curriculum_Name: String,
    Country_Name: String,
    Currency: String,
    Class_Days: Number,
    Price: Number,
    Discount_Price: Number,
    Study_Time: Number,
    About_Product: String,
  },
  { timestamps: true },
);
