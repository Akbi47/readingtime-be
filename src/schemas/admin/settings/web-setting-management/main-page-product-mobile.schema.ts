import * as mongoose from 'mongoose';

export const MainPageProductMobileSchema = new mongoose.Schema({
  Id: Number,
  MainPage_Product_Mobile_Name: String,
  Display: Boolean,
});
