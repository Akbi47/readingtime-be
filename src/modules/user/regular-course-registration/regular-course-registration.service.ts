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
import { CourseRegistrationService } from '../course-registration/course-registration.service';
import { IdDto } from 'src/shares/dtos/param.dto';
import { ReadingRoom } from '../reading-room/schemas/reading-room.schema';
import {
  RegularProduct,
  RegularProductDocument,
} from 'src/modules/admin/product-management/regular-product/schemas/regular-product.schema';
import { CourseRegistration } from '../course-registration/schemas/course-registration.schema';

@Injectable()
export class RegularCourseRegistrationService {
  constructor(
    @InjectModel(RegularCourseRegistration.name)
    private readonly regularCourseRegistrationModel: Model<RegularCourseRegistrationDocument>,
    @InjectModel(RegularProduct.name)
    private readonly regularProductModel: Model<RegularProductDocument>,
    private accountUser: AccountUserService,
    private readingRoomService: ReadingRoomService,
    private courseRegistrationService: CourseRegistrationService,
  ) {}

  async getRegularCourseRegistrationById(id?: string): Promise<any> {
    const data = await this.regularCourseRegistrationModel.findById({
      _id: new mongoose.Types.ObjectId(id),
    });
    return data;
  }
  populateRegularProduct = [
    {
      path: 'regular_product_id',
      model: this.regularProductModel,
    },
  ];
  async getAll(): Promise<CourseRegistration[]> {
    return await this.regularProductModel
      .find()
      .populate(this.populateRegularProduct);
  }

  async create(data: RegularCourseRegistrationDto): Promise<ReadingRoom> {
    const { email } = data;

    const user = await this.accountUser.findOne({
      email,
      status: UserStatus.ACTIVE,
    });
    if (!user) {
      throw new BadRequestException(httpErrors.ACCOUNT_NOT_FOUND);
    } else {
      const registeredCourse =
        await this.regularCourseRegistrationModel.findOne({
          user_account: new mongoose.Types.ObjectId(user._id),
        });
      if (registeredCourse) {
        throw new BadRequestException(httpErrors.PRODUCT_EXISTED);
      }
      const res = await this.regularCourseRegistrationModel.create({
        ...data,
        user_account: new mongoose.Types.ObjectId(user._id),
      });
      const readingRoomDetails =
        await this.readingRoomService.findByStudentIdAndUpdateReadingRoom(
          user._id,
          res._id,
          false,
        );
      if (!readingRoomDetails) {
        throw new BadRequestException(httpErrors.ROOM_NOT_FOUND);
      }
      const payload = { id: readingRoomDetails._id } as IdDto;
      return await this.courseRegistrationService.createEvents(payload, false);
    }
  }
}
