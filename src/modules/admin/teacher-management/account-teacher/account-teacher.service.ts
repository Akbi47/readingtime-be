import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAccountTeacherDto } from './dto/create-account-teacher.dto';

import { httpErrors } from 'src/shares/exceptions';
import { UserStatus } from 'src/shares/enums/account-user.enum';
import {
  AccountTeacher,
  AccountTeacherDocument,
} from './schemas/account-teacher.schema';
import { AccountUserService } from '../../user-management/account-user/account-user.service';

@Injectable()
export class AccountTeacherService {
  constructor(
    @InjectModel(AccountTeacher.name)
    private accountTeacherModel: Model<AccountTeacherDocument>,
    private accountUser: AccountUserService,
  ) {}

  async getAccountTeacher(): Promise<AccountTeacher[]> {
    return this.accountTeacherModel.find();
  }

  async getAccountTeacherId(_id: string): Promise<AccountTeacher> {
    return this.accountTeacherModel.findOne({ _id }).exec();
  }

  async updateAccountTeacher(
    accountTeacher: AccountTeacherDocument,
  ): Promise<void> {
    const { _id, ...updatedData } = accountTeacher;
    const user = await this.accountTeacherModel.findById(_id);

    if (!user) {
      throw new BadRequestException(httpErrors.ACCOUNT_NOT_FOUND);
    }
    const user_id = user.teacher_id;
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
    const { email, password } = accountTeacherDto;

    const payload = { email, password } as CreateAccountTeacherDto;
    const teacher = await this.accountUser.findOne({
      email,
      status: UserStatus.ACTIVE,
    });

    if (teacher) {
      throw new BadRequestException(httpErrors.ACCOUNT_EXISTED);
    }
    const data = await this.accountUser.createTeacher(payload);

    delete accountTeacherDto.password;

    const res = await this.accountTeacherModel.create({
      ...accountTeacherDto,
      teacher_id: data._id,
    });

    return res;
  }
}
