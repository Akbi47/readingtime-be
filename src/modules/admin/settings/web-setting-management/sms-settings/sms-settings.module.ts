import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SMSSettingsController } from './sms-settings.controller';
import { SMSSettingsSchema } from '../../../../../schemas/admin/settings/web-setting-management/sms-settings.schema';
import { SMSSettingsService } from './sms-settings.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'SMSSettings', schema: SMSSettingsSchema },
    ]),
  ],
  controllers: [SMSSettingsController],
  providers: [SMSSettingsService],
})
export class SMSSettingsModule {}
