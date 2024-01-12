import * as mongoose from 'mongoose';

export const CurriculumSchema = new mongoose.Schema(
  {
    Curriculum_Title: String,
    Subtitle: String,
    Division: String,
    _Description: String,
    Whether_To_Use: Boolean,
    Book_Id: String,
  },
  { timestamps: true },
);
