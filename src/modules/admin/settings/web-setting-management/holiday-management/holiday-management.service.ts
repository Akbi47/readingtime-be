import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HolidayManagement } from './interface/holiday-management.interface';
import { HolidayManagementDto } from './dto/holiday-management.dto';

@Injectable()
export class HolidayManagementService {
  constructor(
    @InjectModel('HolidayManagement')
    private readonly holidayManagementModel: Model<HolidayManagement>,
  ) {}

  async getHolidayManagement(): Promise<HolidayManagement[]> {
    return this.holidayManagementModel.find().exec();
  }

  async updateHolidayManagement(
    holidayManagement: HolidayManagement,
  ): Promise<HolidayManagement> {
    const { _id, ...updatedData } = holidayManagement;
    return this.holidayManagementModel
      .findOneAndUpdate({ _id }, updatedData, { new: true })
      .exec();
  }

  async createHolidayManagement(
    holidayManagementDto: HolidayManagementDto,
  ): Promise<HolidayManagement> {
    const createdRoleManagement = new this.holidayManagementModel(
      holidayManagementDto,
    );
    return createdRoleManagement.save();
  }

  async deleteHolidayManagementById(_id: number): Promise<any> {
    return this.holidayManagementModel.deleteOne({ _id: _id }).exec();
  }
}
