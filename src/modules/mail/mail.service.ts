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
      from: `"ReadingTime Team" <${mailFrom}>`, // override default from
      subject: 'Registration information for trial learning',
      template: 'register-course-user-email.hbs', // template mail cho user
      context: {
        name: user.student_name,
        course: user.course,
        email: mailFrom,
      },
    });
  }

  async sendMailToAdmin(user: any): Promise<void> {
    // Tạo một mảng mới để lưu kết quả
    const result = [];
    // Duyệt qua các phần tử của mảng class_per_week
    for (let i = 0; i < user.class_per_week.length; i++) {
      // Lấy ra phần tử hiện tại
      const element = user.class_per_week[i];

      // Duyệt qua các trường của phần tử
      for (const key in element) {
        // Kiểm tra nếu giá trị của trường là true
        if (element[key] === true) {
          // Thêm trường vào mảng kết quả
          result.push(key);
        }
      }
    }
    const res = result.join(', ');
    await this.mailerService.sendMail({
      to: mailFrom,
      subject: 'Registration information for trial learning',
      template: 'register-course-admin-email.hbs', // template mail cho admin
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
