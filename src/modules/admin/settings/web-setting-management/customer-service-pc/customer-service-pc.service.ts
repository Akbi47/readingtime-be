import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CustomerServicePC } from './interface/customer-service-pc.interface';

@Injectable()
export class CustomerServicePCService {
  constructor(
    @InjectModel('CustomerServicePC')
    private readonly customerServicePCModel: Model<CustomerServicePC>,
  ) {}

  async getCustomerServicePC(): Promise<CustomerServicePC[]> {
    return this.customerServicePCModel.find().exec();
  }
}
