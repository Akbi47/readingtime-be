import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MailSettings } from './interface/mail-settings.interface';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailSettingsService {
  constructor(
    @InjectModel('MailSettings')
    private readonly mailSettingsModel: Model<MailSettings>,
  ) {}

  async getMailSettings(): Promise<MailSettings[]> {
    return this.mailSettingsModel.find();
  }

  async updateMailSettings(mailSettings: MailSettings): Promise<MailSettings> {
    const { Id, ...updateData } = mailSettings;
    return this.mailSettingsModel
      .findOneAndUpdate({ Id }, updateData, { new: true })
      .exec();
  }

  async sendEmail(to: string): Promise<void> {
    const mailSettings = await this.mailSettingsModel.findOne().exec();
    const transporter = nodemailer.createTransport({
      host: mailSettings.SMTP_Host,
      port: mailSettings.SMTP_Security === 'SSL' ? 465 : mailSettings.SMTP_Port,
      secure: mailSettings.SMTP_Security === 'SSL' ? true : false,
      auth: mailSettings.SMTP_Authentication_Required
        ? {
            user: mailSettings.SMTP_User_Id,
            pass: mailSettings.SMTP_User_Password,
          }
        : null,
    });
    const mailOptions = {
      from: mailSettings.Email_Sending_Address,
      to,
      html: mailSettings.Email_Template,
      subject: 'Notifications from English Wing',
    };
    await transporter.sendMail(mailOptions);
  }
}
