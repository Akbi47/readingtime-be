import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MainMenuPCController } from './main-menu-pc.controller';
import { MainMenuPCSchema } from '../../../../../schemas/admin/settings/web-setting-management/main-menu-pc.schema';
import { MainMenuPCService } from './main-menu-pc.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'MainMenuPC', schema: MainMenuPCSchema },
    ]),
  ],
  controllers: [MainMenuPCController],
  providers: [MainMenuPCService],
})
export class MainMenuPCModule {}
