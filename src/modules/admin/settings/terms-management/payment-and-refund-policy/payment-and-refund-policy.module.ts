import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentAndRefundPolicyController } from './payment-and-refund-policy.controller';
import { PaymentAndRefundPolicySchema } from '../../../../../schemas/admin/settings/terms-management/payment-and-refund-policy.schema';
import { PaymentAndRefundPolicyService } from './payment-and-refund-policy.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'PaymentAndRefundPolicy', schema: PaymentAndRefundPolicySchema },
    ]),
  ],
  controllers: [PaymentAndRefundPolicyController],
  providers: [PaymentAndRefundPolicyService],
})
export class PaymentAndRefundPolicyModule {}
