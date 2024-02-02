import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { UserStatus } from 'src/shares/enums/account-user.enum';
import { AccountUserService } from 'src/modules/admin/user-management/account-user/account-user.service';
import { httpErrors } from 'src/shares/exceptions';
import { RegularCourseRegistrationDto } from './dto/regular-course-registration.dto';
import {
  RegularCourseRegistration,
  RegularCourseRegistrationDocument,
} from './schemas/regular-course-registration.schema';
import { ReadingRoomService } from '../reading-room/reading-room.service';

@Injectable()
export class RegularCourseRegistrationService {
  constructor(
    @InjectModel(RegularCourseRegistration.name)
    private readonly regularCourseRegistrationModel: Model<RegularCourseRegistrationDocument>,
    private accountUser: AccountUserService,
    private readingRoomService: ReadingRoomService,
  ) {}
  async create(
    data: RegularCourseRegistrationDto,
  ): Promise<RegularCourseRegistration> {
    const { email } = data;

    const user = await this.accountUser.findOne({
      email,
      status: UserStatus.ACTIVE,
    });
    if (!user) {
      throw new BadRequestException(httpErrors.ACCOUNT_NOT_FOUND);
    }
    const registeredCourse = await this.regularCourseRegistrationModel.findOne({
      user_account: new mongoose.Types.ObjectId(user._id),
    });
    if (registeredCourse) {
      throw new BadRequestException(httpErrors.PRODUCT_EXISTED);
    }
    const res = await this.regularCourseRegistrationModel.create({
      ...data,
      user_account: new mongoose.Types.ObjectId(user._id),
    });

    await this.readingRoomService.findByIdAndUpdateReadingRoom(
      user._id,
      res._id,
    );
    return res;
  }
}
