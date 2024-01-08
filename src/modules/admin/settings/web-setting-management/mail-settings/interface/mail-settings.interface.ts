import { Document } from 'mongoose';

export interface MailSettings extends Document {
  readonly Id: number;
  readonly Email_Sending_Address: string;
  readonly Email_Receiving_Address: string;
  readonly SMTP_Host: string;
  readonly SMTP_Port: number;
  readonly SMTP_Security: string;
  readonly SMTP_Authentication_Required: boolean;
  readonly SMTP_User_Id: string;
  readonly SMTP_User_Password: string;
  readonly Email_Template: string;
}
