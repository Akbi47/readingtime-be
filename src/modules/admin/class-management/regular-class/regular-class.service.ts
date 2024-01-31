import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  RegularClass,
  RegularClassDocument,
} from './schemas/regular-class.schema';
import { CreateRegularClassDto } from './dto/create-regular-class.schema';

@Injectable()
export class RegularClassService {
  constructor(
    @InjectModel(RegularClass.name)
    private regularClassModel: Model<RegularClassDocument>,
  ) {}

  async createRegularClass(
    createRegularClassDto: CreateRegularClassDto,
  ): Promise<RegularClass> {
    return await this.regularClassModel.create(createRegularClassDto);
  }
  async getRegularClass(): Promise<RegularClass[]> {
    return this.regularClassModel.find();
  }

  async updateRegularClass(
    regularClassDocument: RegularClassDocument,
  ): Promise<void> {
    const { _id, ...updatedData } = regularClassDocument;
    await this.regularClassModel
      .findOneAndUpdate({ _id }, updatedData, {
        new: true,
      })
      .exec();
  }
}
