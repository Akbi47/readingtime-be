import { MailerService } from '@nestjs-modules/mailer';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
// import { Logger } from '@nestjs/common';
// import { MailerService } from '@nestjs-modules/mailer';

@Processor('mail')
export class MailProcessor {
  constructor(
    // private readonly logger = new Logger(MailProcessor.name),
    // @Inject(forwardRef(() => MailService))
    private mailerService: MailerService,
  ) {}

  @Process('sendForgotPasswordEmail')
  async sendForgotPasswordEmail(job: Job) {
    await this.mailerService.sendMail({
      to: job.data['to'],
      from: job.data['from'],
      subject: job.data['subject'],
      template: job.data['template'],
      context: {
        email: job.data.context.email,
        code: job.data.context.code,
        supportEmail: job.data.context.supportEmail,
      },
    });
  }

  @Process('sendMailToAdmin')
  async sendMailToAdmin(job: Job) {
    await this.mailerService.sendMail({
      to: job.data['to'],
      subject: job.data['subject'],
      ...(job.data['html'] === ''
        ? { template: job.data['template'] }
        : { html: job.data['html'] }),
      context: {
        name: job.data.context.name,
        email: job.data.context.email,
        age: job.data.age,
        course: job.data.course,
        phone: job.data.phone,
        start_class: job.data.start_class,
        time: job.data.time,
        known_from: job.data.known_from,
        class_per_week: job.data.class_per_week,
      },
    });
  }

  @Process('sendRegisterMailToUser')
  async sendRegisterMailToUser(job: Job) {
    await this.mailerService.sendMail({
      to: job.data['to'],
      from: job.data['from'],
      subject: job.data['subject'],
      ...(job.data['html'] === ''
        ? { template: job.data['template'] }
        : { html: job.data['html'] }),
      context: {
        name: job.data.context.name,
        email: job.data.context.email,
      },
    });
  }

  @Process('sendMailToUser')
  async sendMail(job: Job) {
    await this.mailerService.sendMail({
      to: job.data['to'],
      from: job.data['from'],
      subject: job.data['subject'],
      ...(job.data['html'] === ''
        ? { template: job.data['template'] }
        : { html: job.data['html'] }),
      context: {
        name: job.data.context.name,
        course: job.data.context.course,
        email: job.data.context.email,
      },
    });
  }
}
