import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentManagementController } from './payment-management.controller';
import { PaymentManagementSchema } from '../../../schemas/admin/payment-management.schema';
import { PaymentManagementService } from './payment-management.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'PaymentManagement',
        schema: PaymentManagementSchema,
      },
    ]),
  ],
  controllers: [PaymentManagementController],
  providers: [PaymentManagementService],
})
export class PaymentManagementModule {}
