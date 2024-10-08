import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import {
  AccountUser,
  AccountUserDocument,
} from './schemas/account-user.schema';
import CreateAccountUserDto from './dto/create-account-user.dto';
import { httpErrors } from 'src/shares/exceptions';
import { generateHash } from 'src/shares/helpers/bcrypt';
import { UserRole, UserStatus } from 'src/shares/enums/account-user.enum';
import { GetAccountUserDto } from './dto/get-account-user.dto';
import * as moment from 'moment';
import { CreateAccountTeacherDto } from '../../teacher-management/account-teacher/dto/create-account-teacher.dto';
import { MailService } from 'src/modules/mail/mail.service';
import { ReadingRoomService } from 'src/modules/user/reading-room/reading-room.service';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AccountUserService {
  constructor(
    @InjectModel(AccountUser.name)
    private accountUserModel: Model<AccountUserDocument>,
    private mailService: MailService,
    private readingRoomService: ReadingRoomService,
  ) {}

  async buildQuery(param: GetAccountUserDto): Promise<any> {
    const {
      admission,
      country,
      user,
      email,
      phone,
      englishwing_member,
      list_of_tags,
      registration_date_start,
      registration_date_end,
      last_login_start,
      last_login_end,
    } = param;
    const query: any = { status: UserStatus.ACTIVE };

    if (admission) {
      query.admission = { $regex: admission, $options: 'i' };
    }

    if (email) {
      query.email = { $regex: email, $options: 'i' };
    }

    if (country) {
      query.country = { $regex: country, $options: 'i' };
    }

    if (user) {
      query.user = { $regex: user, $options: 'i' };
    }

    if (phone) {
      query.phone = { $regex: phone, $options: 'i' };
    }

    if (englishwing_member) {
      query.englishwing_member = { $regex: englishwing_member, $options: 'i' };
    }

    if (list_of_tags) {
      query.list_of_tags = { $regex: list_of_tags, $options: 'i' };
    }

    if (registration_date_start && !registration_date_end) {
      query.createdAt = {
        $gte: registration_date_start,
      };
    }

    if (!registration_date_start && registration_date_end) {
      query.createdAt = {
        $lte: registration_date_end,
      };
    }

    if (registration_date_start && registration_date_end) {
      query.createdAt = {
        $gte: registration_date_start,
        $lte: registration_date_end,
      };
    }

    if (last_login_start && !last_login_end) {
      query.last_login = {
        $gte: last_login_start,
      };
    }

    if (!last_login_start && last_login_end) {
      query.last_login = {
        $lte: last_login_end,
      };
    }

    if (last_login_start && last_login_end) {
      query.last_login = {
        $gte: last_login_start,
        $lte: last_login_end,
      };
    }

    return query;
  }

  async getAccountUser(
    getAccountUserDto: GetAccountUserDto,
  ): Promise<AccountUser[]> {
    const query = await this.buildQuery(getAccountUserDto);
    return this.accountUserModel.find(query);
  }

  async getAccountUserId(_id: string): Promise<AccountUser> {
    return this.accountUserModel.findOne({ _id }).exec();
  }

  async updateRecentLogin(id: string): Promise<AccountUser> {
    return await this.accountUserModel.findByIdAndUpdate(
      id,
      { $set: { last_login: moment(Date.now()).format('DD/MM/YYYY') } },
      { new: true },
    );
  }
  async findByIdAndUpdateEmail(
    id: string | mongoose.Schema.Types.ObjectId,
    data: any,
    isEmail?: boolean,
  ): Promise<void> {
    if (isEmail) {
      await this.accountUserModel.findByIdAndUpdate(
        id,
        { email: data },
        {
          new: true,
        },
      );
    }
    if (!isEmail) {
      const { hashPassword } = await generateHash(data);
      await this.accountUserModel.findByIdAndUpdate(
        id,
        { password: hashPassword },
        {
          new: true,
        },
      );
    }
  }

  async updateAccountUserById(accountUser: AccountUserDocument): Promise<void> {
    const { _id, ...updatedData } = accountUser;
    const user = await this.accountUserModel.findById(_id);

    if (!user) {
      throw new BadRequestException(httpErrors.ACCOUNT_NOT_FOUND);
    }
    if (updatedData.password) {
      await this.findByIdAndUpdateEmail(_id, updatedData.password);
    }
    delete updatedData.password;
    await this.accountUserModel.findOneAndUpdate({ _id }, updatedData, {
      new: true,
    });
  }

  async findOne(condition: GetAccountUserDto): Promise<AccountUserDocument> {
    return await this.accountUserModel.findOne(condition);
  }

  async findById(_id: string): Promise<AccountUserDocument> {
    return await this.accountUserModel.findById(_id);
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
    await this.mailService.sendRegisterMailToUser(accountUserDto);
    return data;
  }

  async createStudent(
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
      role: UserRole.user,
      status: UserStatus.ACTIVE,
    });
    await this.readingRoomService.createData({
      student_id: new mongoose.Types.ObjectId(data._id),
    });
    delete data.password;

    return data;
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<any> {
    const { email } = forgotPasswordDto;
    const client = await this.accountUserModel.findOne({ email });
    if (!client) {
      throw new BadRequestException(httpErrors.CLIENT_EMAIL_CONFIRM_NOT_FOUND);
    }
    try {
      return await this.mailService.sendForgotPasswordEmail(email);
    } catch (e) {
      console.log(e);
    }
  }

  async createTeacher(
    accountTeacherDto: CreateAccountTeacherDto,
  ): Promise<AccountUserDocument> {
    const { email, password, nick_name } = accountTeacherDto;
    const user = await this.accountUserModel.findOne({ email });
    if (user) {
      throw new BadRequestException(httpErrors.ACCOUNT_EXISTED);
    }
    const { hashPassword } = await generateHash(password);

    const data = await this.accountUserModel.create({
      ...accountTeacherDto,
      username: nick_name,
      password: hashPassword,
      role: UserRole.teacher,
      status: UserStatus.ACTIVE,
    });
    delete data.password;

    return data;
  }
  async update(filter, update) {
    if (update.refresh_token) {
      const reversedToken = update.refresh_token.split('').reverse().join('');
      update.refresh_token = await bcrypt.hash(reversedToken, 10);
    }
    const payload = {
      _id: filter,
      ...update,
    };
    return await this.updateAccountUserById(payload);
  }
  async getUserByRefresh(refresh_token, email) {
    const user = await this.findOne({ email });
    if (!user) {
      throw new BadRequestException(httpErrors.ACCOUNT_NOT_FOUND);
    }
    const is_equal = await bcrypt.compare(
      refresh_token.split('').reverse().join(''),
      user.refresh_token,
    );

    if (!is_equal) {
      throw new BadRequestException(httpErrors.ACCOUNT_HASH_NOT_MATCH);
    }

    return user;
  }
}
