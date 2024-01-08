import * as mongoose from 'mongoose';

export const HolidayManagementSchema = new mongoose.Schema(
  {
    _Name: String,
    _Start_Date: Date,
    End_Date: Date,
    Annual_Repeat: Boolean,
    Usage_Status: Boolean,
    Registration_Date: Date,
    Country: String,
  },
  { timestamps: true },
);
