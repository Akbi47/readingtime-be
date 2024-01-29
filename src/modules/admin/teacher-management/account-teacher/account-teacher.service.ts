import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAccountTeacherDto } from './dto/create-account-teacher.dto';

import { httpErrors } from 'src/shares/exceptions';
import { generateHash } from 'src/shares/helpers/bcrypt';
import { UserStatus } from 'src/shares/enums/account-user.enum';
import {
  AccountTeacher,
  AccountTeacherDocument,
} from './schemas/account-teacher.schema';

@Injectable()
export class AccountTeacherService {
  constructor(
    @InjectModel(AccountTeacher.name)
    private accountTeacherModel: Model<AccountTeacherDocument>,
  ) {}

  async getAccountTeacher(): Promise<AccountTeacher[]> {
    return this.accountTeacherModel.find();
  }

  async getAccountTeacherId(_id: string): Promise<AccountTeacher> {
    return this.accountTeacherModel.findOne({ _id }).exec();
  }

  // async updateAccountTeacher(
  //   accountTeacher: AccountTeacher,
  // ): Promise<AccountTeacher> {
  //   const { _id, ...updatedData } = accountTeacher;
  //   return this.accountTeacherModel
  //     .findOneAndUpdate({ _id }, updatedData, { new: true })
  //     .exec();
  // }

  // async createAccountTeacher(
  //   accountTeacherDto: CreateAccountTeacherDto,
  // ): Promise<AccountTeacher> {
  //   const data = await this.accountTeacherModel.create(accountTeacherDto);
  //   return data;
  // }
  async createAccountTeacher(
    accountTeacherDto: CreateAccountTeacherDto,
  ): Promise<AccountTeacherDocument> {
    const { email, password } = accountTeacherDto;
    const teacher = await this.accountTeacherModel.findOne({ email });
    if (teacher) {
      throw new BadRequestException(httpErrors.ACCOUNT_EXISTED);
    }
    const { hashPassword } = await generateHash(password);

    const data = await this.accountTeacherModel.create({
      ...accountTeacherDto,
      password: hashPassword,
      // status: UserStatus.ACTIVE,
    });
    delete data.password;

    return data;
  }
}
