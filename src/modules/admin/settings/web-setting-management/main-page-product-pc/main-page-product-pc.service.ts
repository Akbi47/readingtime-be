import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MainPageProductPC } from './interface/main-page-product-pc.interface';

@Injectable()
export class MainPageProductPCService {
  constructor(
    @InjectModel('MainPageProductPC')
    private readonly mainPageProductPCModel: Model<MainPageProductPC>,
  ) {}

  async getMainPageProductPC(): Promise<MainPageProductPC[]> {
    return this.mainPageProductPCModel.find().exec();
  }
}
