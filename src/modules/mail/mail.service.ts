import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable } from '@nestjs/common';
import { CourseRegistrationDto } from '../user/course-registration/dto/course-registration.dto';
import { MailSettingsService } from '../admin/settings/web-setting-management/mail-settings/mail-settings.service';
import { Queue } from 'bull';
import { Cache } from 'cache-manager';
import { InjectQueue } from '@nestjs/bull';
import { generateRandomNumber } from 'src/shares/helpers/utils';
import { CacheForgotPassword } from '../admin/user-management/account-user/dto/forgot-password.dto';
import {
  FORGOT_PASSWORD_CACHE,
  FORGOT_PASSWORD_EXPIRY,
} from '../authentication/auth.constants';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class MailService {
  constructor(
    @InjectQueue('mail') private queue: Queue,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
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

  async sendForgotPasswordEmailJob(email: string) {
    const code = generateRandomNumber(6);
    const job = await this.queue.add(
      'sendForgotPasswordEmail',
      {
        email,
        code,
        supportEmail: this.mailSettings[0]?.Email_Sending_Address,
      },
      {
        removeOnComplete: true,
      },
    );
    return { jobId: job.id };
  }

  async sendForgotPasswordEmail(email: string) {
    const code = generateRandomNumber(6);

    await this.mailerService.sendMail({
      to: email,
      from: `"ReadingTime Team" <${this.mailSettings[0]?.Email_Sending_Address}>`, // override default from
      subject: 'RESET PASSWORD',
      template: 'forgot-password.hbs',
      context: {
        email,
        code,
        supportEmail: this.mailSettings[0]?.Email_Sending_Address,
      },
    });

    const cacheInfo: CacheForgotPassword = {
      code,
      attempt: 0,
    };

    await this.cacheManager.set<string>(
      `${FORGOT_PASSWORD_CACHE}${email}`,
      JSON.stringify(cacheInfo),
      {
        ttl: FORGOT_PASSWORD_EXPIRY,
      },
    );
  }
}
