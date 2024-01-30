import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MailService } from 'src/modules/mail/mail.service';
import { MailConfigService } from './config-mail.service';
import { MailSettingsModule } from '../admin/settings/web-setting-management/mail-settings/mail-settings.module';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [MailSettingsModule],
      useClass: MailConfigService,
    }),
  ],

  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
