import * as mongoose from 'mongoose';

export const CustomerServiceMobileSchema = new mongoose.Schema({
  Id: Number,
  Customer_Service_Mobile_Name: String,
  Display: Boolean,
});
