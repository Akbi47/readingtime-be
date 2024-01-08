import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MainPageProductMobileController } from './main-page-product-mobile.controller';
import { MainPageProductMobileSchema } from '../../../../../schemas/admin/settings/web-setting-management/main-page-product-mobile.schema';
import { MainPageProductMobileService } from './main-page-product-mobile.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'MainPageProductMobile', schema: MainPageProductMobileSchema },
    ]),
  ],
  controllers: [MainPageProductMobileController],
  providers: [MainPageProductMobileService],
})
export class MainPageProductMobileModule {}
