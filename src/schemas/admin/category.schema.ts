import * as mongoose from 'mongoose';

export const CategorySchema = new mongoose.Schema({
  Category_Name: String,
  Type: Boolean,
});
