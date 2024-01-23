import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable } from '@nestjs/common';

const mailFrom = process.env.MAIL_FROM;

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendSignUpEmail(signUpInterface: any): Promise<void> {
    const { email, code } = signUpInterface;

    await this.mailerService.sendMail({
      to: email,
      from: `"Support Team" <${mailFrom}>`, // override default from
      subject: 'PET SHOP - NEW SIGN-UP TO EXCLUSIVE ACCESS',
      template: 'src/modules/mail/templates/sign-up.hbs', // `.hbs` extension is appended automatically
      context: {
        email,
        code,
        supportEmail: mailFrom,
      },
    });
  }
}
