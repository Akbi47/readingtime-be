import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Curriculum } from './interface/curriculum.interface';
import { CurriculumDto } from './dto/curriculum.dto';

@Injectable()
export class CurriculumService {
  constructor(
    @InjectModel('Curriculum')
    private readonly CurriculumModel: Model<Curriculum>,
  ) {}

  async getCurriculum(): Promise<Curriculum[]> {
    return this.CurriculumModel.find().exec();
  }

  async getCurriculumById(_id: string): Promise<Curriculum> {
    return this.CurriculumModel.findById(_id).exec();
  }

  async createCurriculum(CurriculumDto: CurriculumDto): Promise<Curriculum> {
    const createdCurriculum = new this.CurriculumModel(CurriculumDto);
    return createdCurriculum.save();
  }

  async updateCurriculum(Curriculum: Curriculum): Promise<Curriculum> {
    const { _id, ...updatedData } = Curriculum;
    return this.CurriculumModel.findOneAndUpdate({ _id }, updatedData, {
      new: true,
    }).exec();
  }
}
