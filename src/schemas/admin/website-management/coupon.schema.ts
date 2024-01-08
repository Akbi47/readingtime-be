import * as mongoose from 'mongoose';

export const CouponSchema = new mongoose.Schema(
  {
    Type: String,
    Target: String,
    Cycle: String,
    Name: String,
    Description: String,
    Discount_Rate: Number,
    Expiration_Period: String,
    Issue_Date: Number,
  },
  { timestamps: true },
);
