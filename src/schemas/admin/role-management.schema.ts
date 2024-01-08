import * as mongoose from 'mongoose';

export const RoleManagementSchema = new mongoose.Schema(
  {
    _Name: String,
    Nickname: String,
    Email: String,
    Password: String,
    Gender: Boolean,
    Birth: Date,
    Country: String,
    Contract_Type: String,
    _Contract: String,
    _Start_Date: Date,
    Registration_Date: Date,
    Authority_Type: String,
    _Image: String,
  },
  { timestamps: true },
);
