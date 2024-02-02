import { BadRequestException, Injectable, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  TrialProduct,
  TrialProductDocument,
} from './schemas/trial-product.schema';
import CreateTrialProductDto from './dto/create-trial-product.dto';
import { httpErrors } from 'src/shares/exceptions';
import GetTrialProductDto from './dto/get-trial-product.dto';

@Injectable()
export class FreeTrialProductService {
  constructor(
    @InjectModel(TrialProduct.name)
    private trialProductModel: Model<TrialProductDocument>,
  ) {}
  async buildQuery(param: GetTrialProductDto): Promise<any> {
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
  async getFreeTrialProduct(
    @Query() getTrialProductDto: GetTrialProductDto,
  ): Promise<TrialProduct[]> {
    const query = await this.buildQuery(getTrialProductDto);
    return await this.trialProductModel.find(query);
  }

  async getFreeTrialProductById(_id: string): Promise<TrialProduct> {
    return this.trialProductModel.findById(_id).exec();
  }

  async getFreeTrialProductByName(name: string): Promise<TrialProduct> {
    return this.trialProductModel.findOne({ product_name: name });
  }

  async createFreeTrialProduct(
    createTrialProductDto: CreateTrialProductDto,
  ): Promise<TrialProduct> {
    const { product_name } = createTrialProductDto;
    const product = await this.trialProductModel.findOne({ product_name });
    if (product) {
      throw new BadRequestException(httpErrors.PRODUCT_EXISTED);
    }

    const data = await this.trialProductModel.create(createTrialProductDto);

    return data;
  }

  async updateFreeTrialProduct(
    FreeTrialProduct: TrialProductDocument,
  ): Promise<void> {
    const { _id, ...updatedData } = FreeTrialProduct;
    await this.trialProductModel
      .findOneAndUpdate({ _id }, updatedData, {
        new: true,
      })
      .exec();
  }
}
