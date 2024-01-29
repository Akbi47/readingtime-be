import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WorkingHoursDocument } from './schemas/working-hours.schema';

@Injectable()
export class WorkingHoursService {
  constructor(
    @InjectModel('WorkingHours')
    private readonly WorkingHoursModel: Model<WorkingHoursDocument>,
  ) {}

  // async getWorkingHours(): Promise<WorkingHours[]> {
  //   return this.WorkingHoursModel.find().exec();
  // }

  // async getWorkingHoursById(_id: string): Promise<WorkingHours> {
  //   return this.WorkingHoursModel.findById(_id).exec();
  // }

  // async createWorkingHours(
  //   WorkingHoursDto: WorkingHoursDto,
  // ): Promise<WorkingHours> {
  //   const createdWorkingHours = new this.WorkingHoursModel(WorkingHoursDto);
  //   return createdWorkingHours.save();
  // }

  // async updateWorkingHours(WorkingHours: WorkingHours): Promise<WorkingHours> {
  //   const { _id, ...updatedData } = WorkingHours;
  //   return this.WorkingHoursModel.findOneAndUpdate({ _id }, updatedData, {
  //     new: true,
  //   }).exec();
  // }
}
