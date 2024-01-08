import { Document } from 'mongoose';

export interface SMTPSecutiry extends Document {
  readonly Id: number;
  readonly SMTP_Security_Name: string;
}
