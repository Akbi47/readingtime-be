import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MailSettingsSchema } from 'src/schemas/admin/settings/web-setting-management/mail-settings.schema';
import { MailSettingsController } from './mail-settings.controller';
import { MailSettingsService } from './mail-settings.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'MailSettings', schema: MailSettingsSchema },
    ]),
  ],
  controllers: [MailSettingsController],
  providers: [MailSettingsService],
})
export class MailSettingsModule {}
