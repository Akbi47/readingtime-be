import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateAccountTeacherDto } from './dto/create-account-teacher.dto';

import { httpErrors } from 'src/shares/exceptions';
import { UserStatus } from 'src/shares/enums/account-user.enum';
import {
  AccountTeacher,
  AccountTeacherDocument,
} from './schemas/account-teacher.schema';
import { AccountUserService } from '../../user-management/account-user/account-user.service';
import { MailService } from 'src/modules/mail/mail.service';
import {
  WorkingHours,
  WorkingHoursDocument,
} from '../working-hours/schemas/working-hours.schema';
import { GetAccountTeacherDto } from './dto/get-account-teacher.dto';
import { TeamManagementService } from '../../team-management/team-management.service';
import GetTeamManagementDto from '../../team-management/dto/get-team-management.dto';
import {
  TeamManagement,
  TeamManagementDocument,
} from '../../team-management/schemas/team-management.schema';

@Injectable()
export class AccountTeacherService {
  constructor(
    @InjectModel(AccountTeacher.name)
    private accountTeacherModel: Model<AccountTeacherDocument>,
    @InjectModel(WorkingHours.name)
    private workingHoursModel: Model<WorkingHoursDocument>,
    @InjectModel(TeamManagement.name)
    private teamManagementModel: Model<TeamManagementDocument>,
    private accountUser: AccountUserService,
    private teamManagementService: TeamManagementService,
    private mailService: MailService,
  ) {}
  async buildQuery(param: GetAccountTeacherDto): Promise<any> {
    const { team_name, team_leader, teacher, nick_name } = param;
    const query: any = {};

    if (team_name) {
      const queryTeam: any = {};
      queryTeam.name = { $regex: team_name, $options: 'i' };
      const teamId = await this.teamManagementModel
        .findOne(queryTeam)
        .select('_id');

      // query.team_name = new mongoose.Types.ObjectId(teamId);
      query.team_name = teamId;
    }

    // if (team_leader) {
    //   query.team_leader = { $regex: team_leader, $options: 'i' };
    // }

    if (teacher) {
      query.teacher = { $regex: teacher, $options: 'i' };
    }

    if (nick_name) {
      query.nick_name = { $regex: nick_name, $options: 'i' };
    }

    return query;
  }
  async getAccountTeacher(query?: any): Promise<any> {
    if (query.id) {
      const timeline = await this.workingHoursModel.findOne({
        teacher_id: query.id,
      });
      const teacher = await this.accountTeacherModel.findById({
        _id: query.id,
      });
      const data = [];
      data.push({
        timeline,
        teacher,
      });
      return data;
    }
    return this.accountTeacherModel.find();
  }

  async getAccountTeacherId(_id: string): Promise<AccountTeacher> {
    return this.accountTeacherModel.findOne({ _id }).exec();
  }
  async getTeacherByInfo(
    getAccountTeacherDto: GetAccountTeacherDto,
  ): Promise<AccountTeacherDocument> {
    const query = await this.buildQuery(getAccountTeacherDto);
    return this.accountTeacherModel.findOne(query);
  }

  async updateAccountTeacher(
    accountTeacher: AccountTeacherDocument,
  ): Promise<void> {
    const { _id, ...updatedData } = accountTeacher;
    const user = await this.accountTeacherModel.findById(_id);

    if (!user) {
      throw new BadRequestException(httpErrors.ACCOUNT_NOT_FOUND);
    }
    const user_id = user.teacher_id.toString();
    if (updatedData.email) {
      await this.accountUser.findByIdAndUpdateEmail(
        user_id,
        updatedData.email,
        true,
      );
    }
    if (updatedData.password) {
      await this.accountUser.findByIdAndUpdateEmail(
        user_id,
        updatedData.password,
      );
    }
    delete updatedData.password;
    await this.accountTeacherModel.findOneAndUpdate({ _id }, updatedData, {
      new: true,
    });
  }

  async createAccountTeacher(
    accountTeacherDto: CreateAccountTeacherDto,
  ): Promise<AccountTeacherDocument> {
    const { email, password, team_name, nick_name } = accountTeacherDto;

    const payloadCreateTeacher = {
      email,
      password,
      nick_name,
    } as CreateAccountTeacherDto;
    const payloadGetTeamName = { name: team_name } as GetTeamManagementDto;

    const [teamName, teacher] = await Promise.all([
      this.teamManagementService.getOneTeamManagement(payloadGetTeamName),
      this.accountUser.findOne({
        email,
        status: UserStatus.ACTIVE,
      }),
    ]);

    if (teacher) {
      throw new BadRequestException(httpErrors.ACCOUNT_EXISTED);
    }
    if (!teamName) {
      throw new BadRequestException(httpErrors.TEAM_NOT_FOUND);
    }
    const data = await this.accountUser.createTeacher(payloadCreateTeacher);

    delete accountTeacherDto.password;

    const res = await this.accountTeacherModel.create({
      ...accountTeacherDto,
      teacher_id: new mongoose.Types.ObjectId(data._id),
      team_name: new mongoose.Types.ObjectId(teamName._id),
    });
    await this.mailService.sendRegisterMailToUser(accountTeacherDto);
    return res;
  }
}
