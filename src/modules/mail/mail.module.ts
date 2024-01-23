import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { join } from 'path';
import { MailService } from 'src/modules/mail/mail.service';

const mailHost = process.env.MAIL_HOST;
const mailPort = +process.env.MAIL_PORT;
const mailAccount = process.env.MAIL_ACCOUNT;
const mailPassword = process.env.MAIL_PASSWORD;
const mailFrom = process.env.MAIL_FROM;

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: mailHost,
        port: mailPort,
        secure: false, // true for 465, false for other ports
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
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
