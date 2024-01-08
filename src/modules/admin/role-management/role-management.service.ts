import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RoleManagement } from './interface/role-management.interface';
import { RoleManagementDto } from './dto/role-management.dto';

@Injectable()
export class RoleManagementService {
  constructor(
    @InjectModel('RoleManagement')
    private readonly roleManagementModel: Model<RoleManagement>,
  ) {}

  async getRoleManagement(): Promise<RoleManagement[]> {
    return this.roleManagementModel.find().exec();
  }

  async getRoleManagementById(_id: string): Promise<RoleManagement> {
    return this.roleManagementModel.findById(_id).exec();
  }

  async createRoleManagement(
    roleManagementDto: RoleManagementDto,
  ): Promise<RoleManagement> {
    const createdRoleManagement = new this.roleManagementModel(
      roleManagementDto,
    );
    return createdRoleManagement.save();
  }

  async updateRoleManagement(
    roleManagement: RoleManagement,
  ): Promise<RoleManagement> {
    const { _id, ...updatedData } = roleManagement;
    return this.roleManagementModel
      .findOneAndUpdate({ _id }, updatedData, { new: true })
      .exec();
  }
}
