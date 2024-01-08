import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CustomerServiceMobile } from './interface/customer-service-mobile.interface';

@Injectable()
export class CustomerServiceMobileService {
  constructor(
    @InjectModel('CustomerServiceMobile')
    private readonly customerServiceMobileModel: Model<CustomerServiceMobile>,
  ) {}

  async getCustomerServiceMobile(): Promise<CustomerServiceMobile[]> {
    return this.customerServiceMobileModel.find().exec();
  }
}
