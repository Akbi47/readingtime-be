import { MailerOptionsFactory, MailerOptions } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { MailSettingsService } from '../admin/settings/web-setting-management/mail-settings/mail-settings.service';

@Injectable()
export class MailConfigService implements MailerOptionsFactory {
  constructor(private mailSettingService: MailSettingsService) {}
  async createMailerOptions(): Promise<MailerOptions> {
    const mailSettings = await this.mailSettingService.getMailSettings();
    // const mailSettings = [];
    console.log({ mailSettings });

    return {
      transport: {
        host:
          mailSettings.length !== 0
            ? mailSettings[0]?.SMTP_Host
            : process.env.MAIL_HOST,
        port:
          mailSettings.length !== 0
            ? mailSettings[0]?.SMTP_Port
            : +process.env.MAIL_PORT,
        secure:
          mailSettings.length !== 0
            ? mailSettings[0]?.SMTP_Security === 'SSL'
              ? true
              : false
            : true, // true for 465, false for other ports
        auth: {
          user:
            mailSettings.length !== 0
              ? mailSettings[0]?.SMTP_User_Id
              : process.env.MAIL_ACCOUNT,
          pass:
            mailSettings.length !== 0
              ? mailSettings[0]?.SMTP_User_Password
              : process.env.MAIL_PASSWORD,
        },
      },
      defaults: {
        from: `"No Reply" <${
          mailSettings.length !== 0
            ? mailSettings[0]?.Email_Sending_Address
            : process.env.MAIL_FROM
        }>`,
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    };
  }
}
