import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  AccountUser,
  AccountUserDocument,
} from './schemas/account-user.schema';
import CreateAccountUserDto from './dto/create-account-user.dto';
import { httpErrors } from 'src/shares/exceptions';
import { generateHash } from 'src/shares/helpers/bcrypt';
import { UserStatus } from 'src/shares/enums/account-user.enum';
import { GetAccountUserDto } from './dto/get-account-user.dto';
import { IdDto } from 'src/shares/dtos/param.dto';

@Injectable()
export class AccountUserService {
  constructor(
    @InjectModel(AccountUser.name)
    private accountUserModel: Model<AccountUserDocument>,
  ) {}

  async getAccountUser(): Promise<AccountUser[]> {
    return this.accountUserModel.find().exec();
  }

  async getAccountUserId(_id: string): Promise<AccountUser> {
    return this.accountUserModel.findOne({ _id }).exec();
  }

  async updateAccountUserById(accountUser: AccountUserDocument): Promise<void> {
    const { _id, ...updatedData } = accountUser;
    const user = await this.accountUserModel.findById(_id);

    if (!user) {
      throw new BadRequestException(httpErrors.ACCOUNT_NOT_FOUND);
    }

    await this.accountUserModel.findOneAndUpdate({ _id }, updatedData, {
      new: true,
    });
  }

  async findOne(condition: GetAccountUserDto): Promise<AccountUserDocument> {
    return await this.accountUserModel.findOne(condition);
  }

  async createAccountUser(
    accountUserDto: CreateAccountUserDto,
  ): Promise<AccountUserDocument> {
    const { email, password } = accountUserDto;
    const user = await this.accountUserModel.findOne({ email });
    if (user) {
      throw new BadRequestException(httpErrors.ACCOUNT_EXISTED);
    }
    const { hashPassword } = await generateHash(password);

    const data = await this.accountUserModel.create({
      ...accountUserDto,
      password: hashPassword,
      status: UserStatus.ACTIVE,
    });
    delete data.password;

    return data;
  }
}
