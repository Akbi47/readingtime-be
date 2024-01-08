import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MainPageProductPCController } from './main-page-product-pc.controller';
import { MainPageProductPCSchema } from '../../../../../schemas/admin/settings/web-setting-management/main-page-product-pc.schema';
import { MainPageProductPCService } from './main-page-product-pc.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'MainPageProductPC', schema: MainPageProductPCSchema },
    ]),
  ],
  controllers: [MainPageProductPCController],
  providers: [MainPageProductPCService],
})
export class MainPageProductPCModule {}
