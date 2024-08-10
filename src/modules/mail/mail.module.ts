import { MailerModule } from '@nestjs-modules/mailer';
import { Logger, Module } from '@nestjs/common';
import { MailService } from 'src/modules/mail/mail.service';
import { MailConfigService } from './config-mail.service';
import { MailSettingsModule } from '../admin/settings/web-setting-management/mail-settings/mail-settings.module';
import { BullModule } from '@nestjs/bull';
import { CacheModule } from '@nestjs/cache-manager';
import { redisConfig } from '../configs/redis.config';
import * as redisStore from 'cache-manager-redis-store';
import { MailProcessor } from './job/mail.processor';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [MailSettingsModule],
      useClass: MailConfigService,
    }),
    BullModule.registerQueue({ name: 'mail' }),
    CacheModule.register({
      store: redisStore,
      isGlobal: true,
      ...redisConfig,
      // host: process.env.REDIS_HOST,
      // port: process.env.REDIS_PORT,
      // username: process.env.REDIS_USERNAME, // new property
      // password: process.env.REDIS_PASSWORD, // new property
      no_ready_check: true, // new property
    }),
    MailSettingsModule,
  ],

  providers: [MailService, MailProcessor, Logger],
  exports: [MailService],
})
export class MailModule {}
