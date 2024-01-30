import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import CreateRoleManagementDto from './dto/create-role-management.dto';
import {
  RoleManagement,
  RoleManagementDocument,
} from './schemas/role-management.schema';

import { UserStatus } from 'src/shares/enums/account-user.enum';
import { httpErrors } from 'src/shares/exceptions';
import GetRoleManagementDto from './dto/get-role-management.dto';
import { AccountUserService } from '../user-management/account-user/account-user.service';

@Injectable()
export class RoleManagementService {
  constructor(
    @InjectModel(RoleManagement.name)
    private roleManagementModel: Model<RoleManagementDocument>,
    private accountUser: AccountUserService,
  ) {}
  async buildQuery(param: GetRoleManagementDto): Promise<any> {
    const { user, email, phone, nick_name, ID } = param;
    const query: any = { status: UserStatus.ACTIVE };

    if (nick_name) {
      query.nick_name = { $regex: nick_name, $options: 'i' };
    }

    if (ID) {
      query.ID = { $regex: ID, $options: 'i' };
    }

    if (email) {
      query.email = { $regex: email, $options: 'i' };
    }

    if (user) {
      query.user = { $regex: user, $options: 'i' };
    }

    if (phone) {
      query.phone = { $regex: phone, $options: 'i' };
    }

    return query;
  }

  async getRoleManagement(
    getRoleManagementDto: GetRoleManagementDto,
  ): Promise<RoleManagement[]> {
    const query = await this.buildQuery(getRoleManagementDto);
    return this.roleManagementModel.find(query).sort({ createdAt: -1 });
  }

  async getRoleManagementById(_id: string): Promise<RoleManagement> {
    return this.roleManagementModel.findById(_id).exec();
  }

  async createRoleManagement(
    roleManagementDto: CreateRoleManagementDto,
  ): Promise<RoleManagement> {
    const { email, password } = roleManagementDto;
    const payload = { email, password } as any;
    const user = await this.roleManagementModel.findOne({
      email,
      status: UserStatus.ACTIVE,
    });
    if (user) {
      throw new BadRequestException(httpErrors.ACCOUNT_EXISTED);
    } else {
      const data = await this.accountUser.createAccountUser(payload);

      delete roleManagementDto.password;
      const res = await this.roleManagementModel.create({
        ...roleManagementDto,
        status: UserStatus.ACTIVE,
        user_id: data._id,
      });

      return res;
    }
  }

  async updateRoleManagement(
    roleManagementDto: RoleManagementDocument,
  ): Promise<void> {
    const { _id, ...updatedData } = roleManagementDto;
    const user = await this.roleManagementModel.findById(_id);

    if (!user) {
      throw new BadRequestException(httpErrors.ACCOUNT_NOT_FOUND);
    }

    await this.roleManagementModel.findOneAndUpdate({ _id }, updatedData, {
      new: true,
    });
  }
}
