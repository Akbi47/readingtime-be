import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerServiceMobileController } from './customer-service-mobile.controller';
import { CustomerServiceMobileSchema } from '../../../../../schemas/admin/settings/web-setting-management/customer-service-mobile.schema';
import { CustomerServiceMobileService } from './customer-service-mobile.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'CustomerServiceMobile', schema: CustomerServiceMobileSchema },
    ]),
  ],
  controllers: [CustomerServiceMobileController],
  providers: [CustomerServiceMobileService],
})
export class CustomerServiceMobileModule {}
