import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FreeTrialProduct } from './interface/free-trial-product.interface';
import { FreeTrialProductDto } from './dto/free-trial-product.dto';

@Injectable()
export class FreeTrialProductService {
  constructor(
    @InjectModel('FreeTrialProduct')
    private readonly FreeTrialProductModel: Model<FreeTrialProduct>,
  ) {}

  async getFreeTrialProduct(): Promise<FreeTrialProduct[]> {
    return this.FreeTrialProductModel.find().exec();
  }

  async getFreeTrialProductById(_id: string): Promise<FreeTrialProduct> {
    return this.FreeTrialProductModel.findById(_id).exec();
  }

  async createFreeTrialProduct(
    FreeTrialProductDto: FreeTrialProductDto,
  ): Promise<FreeTrialProduct> {
    const createdFreeTrialProduct = new this.FreeTrialProductModel(
      FreeTrialProductDto,
    );
    return createdFreeTrialProduct.save();
  }

  async updateFreeTrialProduct(
    FreeTrialProduct: FreeTrialProduct,
  ): Promise<FreeTrialProduct> {
    const { _id, ...updatedData } = FreeTrialProduct;
    return this.FreeTrialProductModel.findOneAndUpdate({ _id }, updatedData, {
      new: true,
    }).exec();
  }
}
