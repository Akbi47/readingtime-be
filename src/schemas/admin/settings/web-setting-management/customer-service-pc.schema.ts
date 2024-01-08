import * as mongoose from 'mongoose';

export const CustomerServicePCSchema = new mongoose.Schema({
  Id: Number,
  Customer_Service_PC_Name: String,
  Display: Boolean,
});
