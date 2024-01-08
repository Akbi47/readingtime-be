import { PaymentManagementDto } from './dto/payment-management.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaymentManagement } from './interface/payment-management.interface';

@Injectable()
export class PaymentManagementService {
  constructor(
    @InjectModel('PaymentManagement')
    private readonly paymentManagementModel: Model<PaymentManagement>,
  ) {}

  async getPaymentManagement(): Promise<PaymentManagement[]> {
    return this.paymentManagementModel.find().exec();
  }

  async getPaymentManagementById(_id: string): Promise<PaymentManagement> {
    return this.paymentManagementModel.findById(_id).exec();
  }

  async createPaymentManagement(
    paymentManagementDto: PaymentManagementDto,
  ): Promise<PaymentManagement> {
    const createdPaymentManagement = new this.paymentManagementModel(
      paymentManagementDto,
    );
    return createdPaymentManagement.save();
  }

  async handlePayment(
    paymentManagement: PaymentManagement,
  ): Promise<PaymentManagement> {
    const { _id, ...updatedData } = paymentManagement;
    return this.paymentManagementModel
      .findOneAndUpdate({ _id }, updatedData, {
        new: true,
      })
      .exec();
  }
}
