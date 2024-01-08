import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AccountTeacher } from './interface/account-teacher.interface';
import { AccountTeacherDto } from './dto/account-teacher.dto';

@Injectable()
export class AccountTeacherService {
  constructor(
    @InjectModel('AccountTeacher')
    private readonly accountTeacherModel: Model<AccountTeacher>,
  ) {}

  async getAccountTeacher(): Promise<AccountTeacher[]> {
    return this.accountTeacherModel.find().exec();
  }

  async getAccountTeacherId(_id: string): Promise<AccountTeacher> {
    return this.accountTeacherModel.findOne({ _id }).exec();
  }

  async updateAccountTeacher(
    accountTeacher: AccountTeacher,
  ): Promise<AccountTeacher> {
    const { _id, ...updatedData } = accountTeacher;
    return this.accountTeacherModel
      .findOneAndUpdate({ _id }, updatedData, { new: true })
      .exec();
  }

  async createAccountTeacher(
    accountTeacherDto: AccountTeacherDto,
  ): Promise<AccountTeacher> {
    const createdRoleManagement = new this.accountTeacherModel(
      accountTeacherDto,
    );
    return createdRoleManagement.save();
  }
}
