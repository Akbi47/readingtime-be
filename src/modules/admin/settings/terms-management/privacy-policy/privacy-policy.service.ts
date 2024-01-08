import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PrivacyPolicy } from './interface/privacy-policy.interface';

@Injectable()
export class PrivacyPolicyService {
  constructor(
    @InjectModel('PrivacyPolicy')
    private readonly PrivacyPolicyModel: Model<PrivacyPolicy>,
  ) {}

  async getPrivacyPolicy(): Promise<PrivacyPolicy[]> {
    return this.PrivacyPolicyModel.find().exec();
  }

  async updatePrivacyPolicy(
    PrivacyPolicy: PrivacyPolicy,
  ): Promise<PrivacyPolicy> {
    const { Id, ...updatedData } = PrivacyPolicy;
    return this.PrivacyPolicyModel.findOneAndUpdate({ Id }, updatedData, {
      new: true,
    }).exec();
  }
}
