import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateTrialClassDto } from './dto/create-trial-class.schema';
import { TrialClass, TrialClassDocument } from './schemas/trial-class.schema';

@Injectable()
export class TrialClassService {
  constructor(
    @InjectModel(TrialClass.name)
    private trialClassModel: Model<TrialClassDocument>,
  ) {}

  async createTrialClass(
    createTrialClassDto: CreateTrialClassDto,
  ): Promise<TrialClass> {
    return await this.trialClassModel.create(createTrialClassDto);
  }
  async getTrialClass(): Promise<TrialClass[]> {
    return this.trialClassModel.find();
  }

  async updateTrialClass(
    TrialClassDocument: TrialClassDocument,
  ): Promise<void> {
    const { _id, ...updatedData } = TrialClassDocument;
    await this.trialClassModel
      .findOneAndUpdate({ _id }, updatedData, {
        new: true,
      })
      .exec();
  }
}
