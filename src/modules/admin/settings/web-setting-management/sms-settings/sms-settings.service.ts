import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SMSSettings } from './interface/sms-settings.interface';
import * as Twilio from 'twilio';

@Injectable()
export class SMSSettingsService {
  private twilioClient: Twilio.Twilio;

  constructor(
    @InjectModel('SMSSettings')
    private readonly smsSettingsModel: Model<SMSSettings>,
  ) {}

  async getSMSSettings(): Promise<SMSSettings[]> {
    return this.smsSettingsModel.find().exec();
  }

  async updateSMSSettings(smsSettings: SMSSettings): Promise<SMSSettings> {
    const { Id, ...updatedData } = smsSettings;
    return this.smsSettingsModel
      .findOneAndUpdate({ Id }, updatedData, { new: true })
      .exec();
  }

  async sendSMS(to: string, body: string): Promise<any> {
    const smsSettings = await this.smsSettingsModel.findOne().exec();
    this.twilioClient = Twilio(smsSettings.SMS_API_KEY, smsSettings.SMS_SECRET);
    return this.twilioClient.messages.create({
      body,
      to,
      from: smsSettings.SMS_Sender_Number,
    });
  }
}
