import * as mongoose from 'mongoose';

export const ClassFeedbackSchema = new mongoose.Schema(
  {
    Team_Name: String,
    Teacher_Name: String,
    Student_Name: String,
    Class_Datetime: Date,
    Video: String,
    TL_Feedback: String,
    Score: Number,
    Teacher_Comment: String,
  },
  { timestamps: true },
);
