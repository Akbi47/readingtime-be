import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { CourseRegistrationDto } from '../user/course-registration/dto/course-registration.dto';
import { MailSettingsService } from '../admin/settings/web-setting-management/mail-settings/mail-settings.service';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private mailSettingService: MailSettingsService,
  ) {}
  mailSettings = [];
  mailData = this.mailSettingService.getMailSettings().then((settings) => {
    this.mailSettings = settings;
  });

  isUseCustomTemplate =
    this.mailSettings[0]?.Email_Template !== '' ? true : false;

  async sendMailToUser(user: CourseRegistrationDto): Promise<void> {
    await this.mailerService.sendMail({
      to: user.email,
      from: `"ReadingTime Team" <${this.mailSettings[0]?.Email_Sending_Address}>`, // override default from
      subject: 'Registration information for trial learning',
      ...(this.isUseCustomTemplate
        ? { html: this.mailSettings[0]?.Email_Template }
        : { template: 'register-course-user-email.hbs' }), // template mail cho user
      context: {
        name: user.student_name,
        course: user.course,
        email: this.mailSettings[0]?.Email_Sending_Address,
      },
    });
  }

  async sendRegisterMailToUser(user: any): Promise<void> {
    console.log({
      mailSettings: this.mailSettings,
      isUseCustomTemplate: this.isUseCustomTemplate,
    });
    await this.mailerService.sendMail({
      to: user.email,
      from: `"ReadingTime Team" <${this.mailSettings[0]?.Email_Sending_Address}>`, // override default from
      subject: 'Register account successfully',
      ...(this.isUseCustomTemplate
        ? { html: this.mailSettings[0]?.Email_Template }
        : { template: 'register-account-user-email.hbs' }),
      context: {
        name: user.email,
        email: this.mailSettings[0]?.Email_Sending_Address,
      },
    });
  }

  async sendMailToAdmin(user: any): Promise<void> {
    const result = [];
    for (let i = 0; i < user.class_per_week.length; i++) {
      const element = user.class_per_week[i];

      for (const key in element) {
        if (element[key] === true) {
          result.push(key);
        }
      }
    }
    const res = result.join(', ');
    await this.mailerService.sendMail({
      to: this.mailSettings[0]?.Email_Receiving_Address,
      subject: 'Registration information for trial learning',
      ...(this.isUseCustomTemplate
        ? { html: this.mailSettings[0]?.Email_Template }
        : { template: 'register-course-admin-email.hbs' }),
      context: {
        name: user.student_name,
        age: user.student_age,
        email: user.email,
        course: user.course,
        phone: user.phone,
        start_class: user.start_class,
        time: user.time,
        known_from: user.known_from,
        class_per_week: res,
      },
    });
  }
}
