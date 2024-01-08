import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MainMenuMobileController } from './main-menu-mobile.controller';
import { MainMenuMobileSchema } from '../../../../../schemas/admin/settings/web-setting-management/main-menu-mobile.schema';
import { MainMenuMobileService } from './main-menu-mobile.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'MainMenuMobile', schema: MainMenuMobileSchema },
    ]),
  ],
  controllers: [MainMenuMobileController],
  providers: [MainMenuMobileService],
})
export class MainMenuMobileModule {}
