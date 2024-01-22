import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { VacationResignationManagement } from './interface/vacation-resignation-management.interface';
import { VacationResignationManagementDto } from './dto/vacation-resignation-management.dto';

@Injectable()
export class VacationResignationManagementService {
  constructor(
    @InjectModel('VacationResignationManagement')
    private readonly vacationResignationManagementModel: Model<VacationResignationManagement>,
  ) {}

  async getVacationResignationManagement(): Promise<
    VacationResignationManagement[]
  > {
    return this.vacationResignationManagementModel.find().exec();
  }

  async getVacationResignationManagementById(
    _id: string,
  ): Promise<VacationResignationManagement> {
    return this.vacationResignationManagementModel.findById(_id).exec();
  }

  async createVacationResignationManagement(
    VacationResignationManagementDto: VacationResignationManagementDto,
  ): Promise<VacationResignationManagement> {
    const createdVacationResignationManagement =
      new this.vacationResignationManagementModel(
        VacationResignationManagementDto,
      );
    return createdVacationResignationManagement.save();
  }

  async updateVacationResignationManagement(
    VacationResignationManagement: VacationResignationManagement,
  ): Promise<VacationResignationManagement> {
    const { _id, ...updatedData } = VacationResignationManagement;
    return this.vacationResignationManagementModel
      .findOneAndUpdate({ _id }, updatedData, { new: true })
      .exec();
  }
}
