import * as mongoose from 'mongoose';

export const AccountUserSchema = new mongoose.Schema(
  {
    User_Name: String,
    User_English_Name: String,
    Email: String,
    Password: String,
    Gender: Boolean,
    Birth: Date,
    Country: String,
    Description: String,
    Picture: String,
    Admission: [String],
    List_of_Tags: [String],
    English_Wing_Member: [String],
    Referal_Code: String,
    Signup_Path: String,
    Course: Number,
    Billing: Number,
    Role: String,
  },
  { timestamps: true },
);
