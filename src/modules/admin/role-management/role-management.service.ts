import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import CreateRoleManagementDto from './dto/create-role-management.dto';
import {
  RoleManagement,
  RoleManagementDocument,
} from './schemas/role-management.schema';
import { AccountUserService } from '../user-management/account-user/account-user.service';
import { UserStatus } from 'src/shares/enums/account-user.enum';

@Injectable()
export class RoleManagementService {
  constructor(
    @InjectModel('RoleManagement')
    private readonly roleManagementModel: Model<RoleManagement>,
    private accountUserService: AccountUserService,
  ) {}

  async getRoleManagement(): Promise<RoleManagement[]> {
    return this.roleManagementModel.find().exec();
  }

  async getRoleManagementById(_id: string): Promise<RoleManagement> {
    return this.roleManagementModel.findById(_id).exec();
  }

  async createRoleManagement(
    roleManagementDto: CreateRoleManagementDto,
  ): Promise<RoleManagementDocument | any> {
    const { email, password, role } = roleManagementDto;
    const user = await this.accountUserService.findOne({
      email,
      status: UserStatus.ACTIVE,
    });
    if (user) {
      const role = user.role;
    } else {
      await this.accountUserService.createAccountUser(roleManagementDto);
    }
  }

  // async updateRoleManagement(
  //   roleManagement: RoleManagement,
  // ): Promise<RoleManagementDocument> {
  //   const { _id, ...updatedData } = roleManagement;
  //   return this.roleManagementModel
  //     .findOneAndUpdate({ _id }, updatedData, { new: true })
  //     .exec();
  // }
}
