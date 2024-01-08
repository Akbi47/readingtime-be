import * as mongoose from 'mongoose';

export const BookSchema = new mongoose.Schema({
  Book_Title: String,
  Subtitle: String,
  Brief_Description: String,
  Summary_Sysnopsis: String,
  Class_Goal: String,
  Genre: String,
  Level: String,
  Page: Number,
  Vocalbulary: Number,
  Grade: String,
  Lexile: String,
  Image: String,
  Attach: String,
  Whether_To_Use: Boolean,
});
