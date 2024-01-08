import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaymentAndRefundPolicy } from './interface/payment-and-refund-policy.interface';

@Injectable()
export class PaymentAndRefundPolicyService {
  constructor(
    @InjectModel('PaymentAndRefundPolicy')
    private readonly paymentAndRefundPolicyModel: Model<PaymentAndRefundPolicy>,
  ) {}

  async getPaymentAndRefundPolicy(): Promise<PaymentAndRefundPolicy[]> {
    return this.paymentAndRefundPolicyModel.find().exec();
  }

  async updatePaymentAndRefundPolicy(
    PaymentAndRefundPolicy: PaymentAndRefundPolicy,
  ): Promise<PaymentAndRefundPolicy> {
    const { Id, ...updatedData } = PaymentAndRefundPolicy;
    return this.paymentAndRefundPolicyModel
      .findOneAndUpdate({ Id }, updatedData, {
        new: true,
      })
      .exec();
  }
}
