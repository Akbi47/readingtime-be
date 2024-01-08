import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WebSettingsController } from './web-settings.controller';
import { WebSettingsSchema } from '../../../../../schemas/admin/settings/web-setting-management/web-settings.schema';
import { WebSettingsService } from './web-settings.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'WebSettings', schema: WebSettingsSchema },
    ]),
  ],
  controllers: [WebSettingsController],
  providers: [WebSettingsService],
})
export class WebSettingsModule {}
