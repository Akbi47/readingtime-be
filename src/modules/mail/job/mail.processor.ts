import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { MailService } from '../mail.service';

@Processor('mail')
export class MailProcessor {
  constructor(
    // private readonly logger = new Logger(MailProcessor.name),
    // @Inject(forwardRef(() => MailService))
    private mailService: MailService,
  ) {}

  @Process('sendForgotPasswordEmail')
  async sendForgotPasswordEmail(job: Job) {
    // this.logger.debug('Start job: sendForgotPasswordEmail');
    const { email } = job.data;
    await this.mailService.sendForgotPasswordEmail(email);

    // this.logger.debug('Done job: sendForgotPasswordEmail');
    return 1;
  }
}
