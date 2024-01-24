import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { CourseRegistrationDto } from '../user/course-registration/dto/course-registration.dto';

const mailFrom = process.env.MAIL_FROM;

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendMailToUser(user: CourseRegistrationDto): Promise<void> {
    await this.mailerService.sendMail({
      to: user.email,
      from: `"Support Team" <${mailFrom}>`, // override default from
      subject: 'Thông tin đăng ký học',
      template: 'register-course-user-email.hbs', // template mail cho user
      context: {
        name: user.student_name,
        course: user.course,
        email: mailFrom,
      },
    });
  }

  async sendMailToAdmin(user: any): Promise<void> {
    await this.mailerService.sendMail({
      to: mailFrom,
      subject: 'Thông báo có người dùng đăng ký học',
      template: 'register-course-admin-email.hbs', // template mail cho admin
      context: {
        name: user.name,
        email: user.email,
        course: user.course,
      },
    });
  }
}
