import * as mongoose from 'mongoose';

export const AdminSettingsSchema = new mongoose.Schema(
  {
    Id: Number,
    Stripe_Publishable_Key: String,
    Stripe_Secret_Key: String,
    Stripe_Webhook_Url: String,
    Paypal_Account: String,
    Paypal_Client_Id: String,
    Paypal_Secret: String,
    Zoom_Api_Key: String,
    Zoom_Api_Secret: String,
    Free_Trial_Product: String,
    Max_Point_On_Month: Number,
    MainMenu_PC_Name: String,
    MainMenu_Mobile_Name: String,
    MainPage_Product_Name: String,
  },
  { timestamps: true },
);
