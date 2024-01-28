import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import CreateRegularProductDto from './dto/create-regular-product.dto';
import { httpErrors } from 'src/shares/exceptions';
import {
  RegularProduct,
  RegularProductDocument,
} from './schemas/regular-product.schema';
import GetRegularProductDto from './dto/get-regular-product.dto';
import getTrialProductDto from '../free-trial-product/dto/Get-trial-product.dto';
import { TrialProduct } from '../free-trial-product/schemas/trial-product.schema';

@Injectable()
export class RegularProductService {
  constructor(
    @InjectModel('RegularProduct')
    private regularProductModel: Model<RegularProduct>,
  ) {}

  async buildQuery(param: GetRegularProductDto): Promise<any> {
    const { country_of_sale, whether_to_use, currency, product_name } = param;
    const query: any = {};

    if (country_of_sale) {
      query.country_of_sale = { $regex: country_of_sale, $options: 'i' };
    }

    if (whether_to_use) {
      query.whether_to_use = { $regex: whether_to_use, $options: 'i' };
    }

    if (currency) {
      query.currency = { $regex: currency, $options: 'i' };
    }

    if (product_name) {
      query.product_name = { $regex: product_name, $options: 'i' };
    }

    return query;
  }
  async getRegularProduct(
    getRegularProductDto: GetRegularProductDto,
  ): Promise<RegularProduct[]> {
    const query = await this.buildQuery(getRegularProductDto);
    return await this.regularProductModel.find(query);
  }
  async getRegularProductById(_id: string): Promise<RegularProduct> {
    return this.regularProductModel.findById(_id).exec();
  }

  async createRegularProduct(
    createRegularProductDto: CreateRegularProductDto,
  ): Promise<RegularProduct> {
    const { product_name } = createRegularProductDto;
    const product = await this.regularProductModel.findOne({ product_name });
    if (product) {
      throw new BadRequestException(httpErrors.PRODUCT_EXISTED);
    }

    const data = await this.regularProductModel.create(createRegularProductDto);

    return data;
  }

  async updateRegularProduct(
    regularProduct: RegularProductDocument,
  ): Promise<RegularProduct> {
    const { _id, ...updatedData } = regularProduct;
    return this.regularProductModel
      .findOneAndUpdate({ _id }, updatedData, {
        new: true,
      })
      .exec();
  }
}
