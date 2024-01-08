import * as mongoose from 'mongoose';

export const MainPageProductPCSchema = new mongoose.Schema({
  Id: Number,
  MainPage_Product_PC_Name: String,
  Display: Boolean,
});
