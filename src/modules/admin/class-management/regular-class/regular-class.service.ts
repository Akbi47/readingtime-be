import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  RegularClass,
  RegularClassDocument,
} from './schemas/regular-class.schema';

@Injectable()
export class RegularClassService {
  constructor(
    @InjectModel(RegularClass.name)
    private regularClassModel: Model<RegularClassDocument>,
  ) {}

  async createData(data: any) {
    return await this.regularClassModel.create(data);
  }
}
