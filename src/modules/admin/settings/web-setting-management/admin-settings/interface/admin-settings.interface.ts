import { Document } from 'mongoose';

export interface AdminSettings extends Document {
  readonly Id: number;
  readonly Stripe_Publishable_Key: string;
  readonly Stripe_Secret_Key: string;
  readonly Stripe_Webhook_Url: string;
  readonly Paypal_Account: string;
  readonly Paypal_Client_Id: string;
  readonly Paypal_Secret: string;
  readonly Zoom_Api_Key: string;
  readonly Zoom_Api_Secret: string;
  readonly Free_Trial_Product: string;
  readonly Max_Point_On_Month: number;
  readonly MainMenu_PC_Name: string;
  readonly MainMenu_Mobile_Name: string;
  readonly MainPage_Product_Name: string;
}
