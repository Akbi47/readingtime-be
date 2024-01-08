import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AccountUser } from './interface/account-user.interface';
import { AccountUserDto } from './dto/account-user.dto';

@Injectable()
export class AccountUserService {
  constructor(
    @InjectModel('AccountUser')
    private readonly accountUserModel: Model<AccountUser>,
  ) {}

  async getAccountUser(): Promise<AccountUser[]> {
    return this.accountUserModel.find().exec();
  }

  async getAccountUserId(_id: string): Promise<AccountUser> {
    return this.accountUserModel.findOne({ _id }).exec();
  }

  async updateAccountUser(accountUser: AccountUser): Promise<AccountUser> {
    const { _id, ...updatedData } = accountUser;
    return this.accountUserModel
      .findOneAndUpdate({ _id }, updatedData, { new: true })
      .exec();
  }

  async createAccountUser(
    accountUserDto: AccountUserDto,
  ): Promise<AccountUser> {
    const createdRoleManagement = new this.accountUserModel(accountUserDto);
    return createdRoleManagement.save();
  }
}
