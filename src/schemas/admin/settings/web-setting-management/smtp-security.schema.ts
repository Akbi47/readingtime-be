import * as mongoose from 'mongoose';

export const SMTPSecuritySchema = new mongoose.Schema(
  {
    Id: Number,
    SMTP_Security_Name: String,
  },
  { timestamps: true },
);
