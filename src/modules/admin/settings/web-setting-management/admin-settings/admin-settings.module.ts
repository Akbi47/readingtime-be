import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminSettingsController } from './admin-settings.controller';
import { AdminSettingsSchema } from '../../../../../schemas/admin/settings/web-setting-management/admin-settings.schema';
import { AdminSettingsService } from './admin-settings.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'AdminSettings', schema: AdminSettingsSchema },
    ]),
  ],
  controllers: [AdminSettingsController],
  providers: [AdminSettingsService],
})
export class AdminSettingsModule {}
