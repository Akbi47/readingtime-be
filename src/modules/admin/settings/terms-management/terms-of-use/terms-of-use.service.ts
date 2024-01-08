import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TermsOfUse } from './interface/terms-of-use.interface';

@Injectable()
export class TermsOfUseService {
  constructor(
    @InjectModel('TermsOfUse')
    private readonly termsOfUseModel: Model<TermsOfUse>,
  ) {}

  async getTermsOfUse(): Promise<TermsOfUse[]> {
    return this.termsOfUseModel.find().exec();
  }

  async updateTermsOfUse(termsOfuse: TermsOfUse): Promise<TermsOfUse> {
    const { Id, ...updatedData } = termsOfuse;
    return this.termsOfUseModel
      .findOneAndUpdate({ Id }, updatedData, { new: true })
      .exec();
  }
}
