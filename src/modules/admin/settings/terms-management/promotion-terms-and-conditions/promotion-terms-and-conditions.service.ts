import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PromotionTermsAndConditions } from './interface/promotion-terms-and-conditions.interface';

@Injectable()
export class PromotionTermsAndConditionsService {
  constructor(
    @InjectModel('PromotionTermsAndConditions')
    private readonly PromotionTermsAndConditionsModel: Model<PromotionTermsAndConditions>,
  ) {}

  async getPromotionTermsAndConditions(): Promise<
    PromotionTermsAndConditions[]
  > {
    return this.PromotionTermsAndConditionsModel.find().exec();
  }

  async updatePromotionTermsAndConditions(
    PromotionTermsAndConditions: PromotionTermsAndConditions,
  ): Promise<PromotionTermsAndConditions> {
    const { Id, ...updatedData } = PromotionTermsAndConditions;
    return this.PromotionTermsAndConditionsModel.findOneAndUpdate(
      { Id },
      updatedData,
      { new: true },
    ).exec();
  }
}
