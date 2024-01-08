import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerServicePCController } from './customer-service-pc.controller';
import { CustomerServicePCSchema } from '../../../../../schemas/admin/settings/web-setting-management/customer-service-pc.schema';
import { CustomerServicePCService } from './customer-service-pc.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'CustomerServicePC', schema: CustomerServicePCSchema },
    ]),
  ],
  controllers: [CustomerServicePCController],
  providers: [CustomerServicePCService],
})
export class CustomerServicePCModule {}
