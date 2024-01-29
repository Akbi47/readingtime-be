import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  VacationResignationManagement,
  VacationResignationManagementDocument,
} from './schemas/vacation-resignation-management.schema';
import { CreateVacationResignationManagementDto } from './dto/create-vacation-resignation-management.dto';

@Injectable()
export class VacationResignationManagementService {
  constructor(
    @InjectModel('VacationResignationManagement')
    private readonly vacationResignationManagementModel: Model<VacationResignationManagementDocument>,
  ) {}

  async getVacationResignationManagement(): Promise<
    VacationResignationManagement[]
  > {
    return this.vacationResignationManagementModel.find();
  }

  async getVacationResignationManagementById(
    _id: string,
  ): Promise<VacationResignationManagement> {
    return this.vacationResignationManagementModel.findById(_id).exec();
  }

  async createVacationResignationManagement(
    vacationResignationManagementDto: CreateVacationResignationManagementDto,
  ): Promise<VacationResignationManagement> {
    return await this.vacationResignationManagementModel.create(
      vacationResignationManagementDto,
    );
  }

  async updateVacationResignationManagement(
    VacationResignationManagement: VacationResignationManagementDocument,
  ): Promise<void> {
    const { _id, ...updatedData } = VacationResignationManagement;
    await this.vacationResignationManagementModel
      .findOneAndUpdate({ _id }, updatedData, { new: true })
      .exec();
  }
}
