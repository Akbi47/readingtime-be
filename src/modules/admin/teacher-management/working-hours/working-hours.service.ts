import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  WorkingHours,
  WorkingHoursDocument,
} from './schemas/working-hours.schema';
import { CreateWorkingHoursDto } from './dto/create-working-hours.dto';

@Injectable()
export class WorkingHoursService {
  constructor(
    @InjectModel('WorkingHours')
    private readonly createWorkingHoursDto: Model<WorkingHoursDocument>,
  ) {}

  async getWorkingHours(): Promise<WorkingHours[]> {
    return this.createWorkingHoursDto.find().exec();
  }

  async getWorkingHoursById(_id: string): Promise<WorkingHours> {
    return this.createWorkingHoursDto.findById(_id).exec();
  }

  async createWorkingHours(
    createWorkingHoursDto: CreateWorkingHoursDto,
  ): Promise<WorkingHours> {
    return await this.createWorkingHoursDto.create(createWorkingHoursDto);
  }

  async updateWorkingHours(WorkingHours: WorkingHoursDocument): Promise<void> {
    const { _id, ...updatedData } = WorkingHours;
    await this.createWorkingHoursDto
      .findOneAndUpdate({ _id }, updatedData, {
        new: true,
      })
      .exec();
  }
}
