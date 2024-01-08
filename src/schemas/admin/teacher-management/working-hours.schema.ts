import * as mongoose from 'mongoose';

export const WorkingHoursSchema = new mongoose.Schema(
  {
    Teacher_Name: String,
    Teacher_Nickname: String,
    Team: String,
    Team_Leader: String,
    Working_Hours: [
      {
        time: Date,
        Mon: Boolean,
        Tue: Boolean,
        Wed: Boolean,
        Thu: Boolean,
        Fri: Boolean,
        Sat: Boolean,
        Sun: Boolean,
      },
    ],
  },
  { timestamps: true },
);
