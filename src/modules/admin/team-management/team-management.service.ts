import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import CreateTeamManagementDto from './dto/team-management.dto';
import {
  TeamManagement,
  TeamManagementDocument,
} from './schemas/team-management.schema';

import { UserStatus } from 'src/shares/enums/account-user.enum';
import { httpErrors } from 'src/shares/exceptions';
import GetTeamManagementDto from './dto/get-team-management.dto';
import { AccountUserService } from '../user-management/account-user/account-user.service';

@Injectable()
export class TeamManagementService {
  constructor(
    @InjectModel(TeamManagement.name)
    private teamManagementModel: Model<TeamManagementDocument>,
    private accountUser: AccountUserService,
  ) {}
  // async buildQuery(param: GetTeamManagementDto): Promise<any> {
  //   const { user, email, phone, nick_name, ID } = param;
  //   const query: any = { status: UserStatus.ACTIVE };

  //   if (nick_name) {
  //     query.nick_name = { $regex: nick_name, $options: 'i' };
  //   }

  //   if (ID) {
  //     query.ID = { $regex: ID, $options: 'i' };
  //   }

  //   if (email) {
  //     query.email = { $regex: email, $options: 'i' };
  //   }

  //   if (user) {
  //     query.user = { $regex: user, $options: 'i' };
  //   }

  //   if (phone) {
  //     query.phone = { $regex: phone, $options: 'i' };
  //   }

  //   return query;
  // }

  async getOneTeamManagement(
    getTeamManagementDto: GetTeamManagementDto,
  ): Promise<TeamManagementDocument> {
    const { name } = getTeamManagementDto;
    return this.teamManagementModel.findOne({ name });
  }

  // async getTeamManagementById(_id: string): Promise<TeamManagement> {
  //   return this.teamManagementModel.findById(_id).exec();
  // }

  async createTeamManagement(
    teamManagementDto: CreateTeamManagementDto,
  ): Promise<TeamManagement> {
    const { name, tl } = teamManagementDto;

    const [team, nameOfTl] = await Promise.all([
      this.teamManagementModel.findOne({
        name,
      }),
      this.accountUser.findOne({
        username: tl,
        status: UserStatus.ACTIVE,
      }),
    ]);
    if (team) {
      throw new BadRequestException(httpErrors.TEAM_EXISTED);
    }
    if (!nameOfTl) {
      throw new BadRequestException(httpErrors.TL_NOT_FOUND);
    } else {
      return await this.teamManagementModel.create({
        name,
        user_id: new mongoose.Types.ObjectId(nameOfTl.id),
      });
    }
  }

  // async updateTeamManagement(
  //   TeamManagementDto: TeamManagementDocument,
  // ): Promise<void> {
  //   const { _id, ...updatedData } = TeamManagementDto;
  //   const user = await this.teamManagementModel.findById(_id);

  //   if (!user) {
  //     throw new BadRequestException(httpErrors.ACCOUNT_NOT_FOUND);
  //   }
  //   const user_id = user.user_id;
  //   if (updatedData.email) {
  //     await this.accountUser.findByIdAndUpdateEmail(
  //       user_id,
  //       updatedData.email,
  //       true,
  //     );
  //   }
  //   if (updatedData.password) {
  //     await this.accountUser.findByIdAndUpdateEmail(
  //       user_id,
  //       updatedData.password,
  //     );
  //   }
  //   delete updatedData.password;
  //   await this.TeamManagementModel.findOneAndUpdate({ _id }, updatedData, {
  //     new: true,
  //   });
  // }
}
