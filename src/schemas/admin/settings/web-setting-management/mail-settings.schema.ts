import * as mongoose from 'mongoose';

export const MailSettingsSchema = new mongoose.Schema(
  {
    Id: Number,
    Email_Sending_Address: String,
    Email_Receiving_Address: String,
    SMTP_Host: String,
    SMTP_Port: Number,
    SMTP_Security: String,
    SMTP_Authentication_Required: Boolean,
    SMTP_User_Id: String,
    SMTP_User_Password: String,
    Email_Template: String,
  },
  { timestamps: true },
);
