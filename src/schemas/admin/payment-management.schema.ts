import * as mongoose from 'mongoose';

export const PaymentManagementSchema = new mongoose.Schema(
  {
    Bill: String,
    Current_Product: String,
    Quantity_Product: Number,
    Country: String,
    Price: Number,
    Payment_Method: String,
    Payer: String,
    Student_Name: String,
    Email_String: String,
    PG_Id: String,
    Billing_Key: String,
    Payment_Date: Date,
    Status: Boolean,
  },
  { timestamps: true },
);
