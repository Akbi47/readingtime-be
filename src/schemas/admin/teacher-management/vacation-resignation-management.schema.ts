import * as mongoose from 'mongoose';

export const VacationResignationManagementSchema = new mongoose.Schema(
  {
    Part: String,
    Name: String,
    TL_Confirm: Boolean,
    Director_Confirm: Boolean,
    Title: String,
    Day: Number,
    Period: String,
    Reasons: String,
    Attach: String,
  },
  { timestamps: true },
);
