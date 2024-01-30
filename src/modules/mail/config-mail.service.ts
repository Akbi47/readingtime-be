import { MailerOptionsFactory, MailerOptions } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { MailSettingsService } from '../admin/settings/web-setting-management/mail-settings/mail-settings.service';
const mailHost = process.env.MAIL_HOST;
const mailPort = +process.env.MAIL_PORT;
const mailAccount = process.env.MAIL_ACCOUNT;
const mailPassword = process.env.MAIL_PASSWORD;
const mailFrom = process.env.MAIL_FROM;
@Injectable()
export class MailConfigService implements MailerOptionsFactory {
  constructor(private mailSettingService: MailSettingsService) {}
  createMailerOptions(): MailerOptions {
    return {
      transport: {
        host: mailHost,
        port: mailPort,
        secure: true, // true for 465, false for other ports
        auth: {
          user: mailAccount,
          pass: mailPassword,
        },
      },
      defaults: {
        from: `"No Reply" <${mailFrom}>`,
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
