import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegularProduct } from './interface/regular-product.interface';
import { RegularProductDto } from './dto/regular-product.dto';

@Injectable()
export class RegularProductService {
  constructor(
    @InjectModel('RegularProduct')
    private readonly regularProductModel: Model<RegularProduct>,
  ) {}

  async getRegularProduct(): Promise<RegularProduct[]> {
    return this.regularProductModel.find().exec();
  }

  async getRegularProductById(_id: string): Promise<RegularProduct> {
    return this.regularProductModel.findById(_id).exec();
  }

  async createRegularProduct(
    regularProductDto: RegularProductDto,
  ): Promise<RegularProduct> {
    const createdRegularProduct = new this.regularProductModel(
      regularProductDto,
    );
    return createdRegularProduct.save();
  }

  async updateRegularProduct(
    regularProduct: RegularProduct,
  ): Promise<RegularProduct> {
    const { _id, ...updatedData } = regularProduct;
    return this.regularProductModel
      .findOneAndUpdate({ _id }, updatedData, {
        new: true,
      })
      .exec();
  }
}
