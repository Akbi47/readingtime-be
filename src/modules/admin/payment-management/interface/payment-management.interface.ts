import { Document } from 'mongoose';

export interface PaymentManagement extends Document {
  readonly Bill: string;
  readonly Current_Product: string;
  readonly Quantity_Product: number;
  readonly Country: string;
  readonly Price: number;
  readonly Payment_Method: string;
  readonly Payer: string;
  readonly Student_Name: string;
  readonly Email_String: string;
  readonly PG_Id: string;
  readonly Billing_Key: string;
  readonly Payment_Date: Date;
  readonly Status: boolean;
}
