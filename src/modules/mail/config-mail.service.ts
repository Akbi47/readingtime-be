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
    console.log(mailSettings);
    console.log(mailSettings[0]?.Email_Sending_Address);

    return {
      transport: {
        host: mailSettings[0]?.SMTP_Host,
        port: mailSettings[0]?.SMTP_Port,
        secure: mailSettings[0]?.SMTP_Security === 'SSL' ? true : false, // true for 465, false for other ports
        auth: {
          user: mailSettings[0]?.SMTP_User_Id,
          pass: mailSettings[0]?.SMTP_User_Password,
        },
      },
      defaults: {
        from: `"No Reply" <${mailSettings[0]?.Email_Sending_Address}>`,
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
