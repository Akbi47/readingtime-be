import * as mongoose from 'mongoose';

export const PointPenaltyManagementSchema = new mongoose.Schema(
  {
    Teacher_Name: String,
    Division: Boolean,
    Items: String,
    Texts: String,
  },
  { timestamps: true },
);
