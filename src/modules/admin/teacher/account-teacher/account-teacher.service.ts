import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAccountTeacherDto } from './dto/create-account-teacher.dto';
import {
  AccountTeacher,
  AccountTeacherDocument,
} from 'src/schemas/admin/teacher-management/account-teacher.schema';

@Injectable()
export class AccountTeacherService {
  constructor(
    @InjectModel(AccountTeacher.name)
    private accountTeacherModel: Model<AccountTeacherDocument>,
  ) {}

  async getAccountTeacher(): Promise<AccountTeacher[]> {
    return this.accountTeacherModel.find().exec();
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

  async createAccountTeacher(
    accountTeacherDto: CreateAccountTeacherDto,
  ): Promise<AccountTeacher> {
    const data = await this.accountTeacherModel.create(accountTeacherDto);
    return data;
  }
}
