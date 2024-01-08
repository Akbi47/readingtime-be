import * as mongoose from 'mongoose';

export const SMSSettingsSchema = new mongoose.Schema(
  {
    Id: Number,
    SMS_API_KEY: String,
    SMS_SECRET: String,
    SMS_Sender_Number: String,
    KakaoTalk_Sender_Id: String,
    Send_Failure_SMS: Boolean,
  },
  { timestamps: true },
);
