import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MainPageProductMobile } from './interface/main-page-product-mobile.interface';

@Injectable()
export class MainPageProductMobileService {
  constructor(
    @InjectModel('MainPageProductMobile')
    private readonly mainPageProductMobileModel: Model<MainPageProductMobile>,
  ) {}

  async getMainPageProductMobile(): Promise<MainPageProductMobile[]> {
    return this.mainPageProductMobileModel.find().exec();
  }
}
