import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import {
  CourseRegistration,
  CourseRegistrationDocument,
} from './schemas/course-registration.schema';
import { CourseRegistrationDto } from './dto/course-registration.dto';
import { MailService } from 'src/modules/mail/mail.service';
import { UserStatus } from 'src/shares/enums/account-user.enum';
import { AccountUserService } from 'src/modules/admin/user-management/account-user/account-user.service';
import { httpErrors } from 'src/shares/exceptions';
import { ReadingRoomService } from '../reading-room/reading-room.service';
import { AuthenticationService } from 'src/modules/authentication/authentication.service';
import { LoginDto } from 'src/modules/authentication/dto/login.dto';
import { DateUtil } from 'src/shares/utils/date.util';
import { IdDto } from 'src/shares/dtos/param.dto';
import { FreeTrialProductService } from 'src/modules/admin/product-management/free-trial-product/free-trial-product.service';
import { ReadingRoom } from '../reading-room/schemas/reading-room.schema';
import {
  RegularCourseRegistration,
  RegularCourseRegistrationDocument,
} from '../regular-course-registration/schemas/regular-course-registration.schema';
import { RegularProductService } from 'src/modules/admin/product-management/regular-product/regular-product.service';

@Injectable()
export class CourseRegistrationService {
  constructor(
    @InjectModel(CourseRegistration.name)
    private readonly courseRegistrationModel: Model<CourseRegistrationDocument>,
    @InjectModel(RegularCourseRegistration.name)
    private readonly regularCourseRegistrationModel: Model<RegularCourseRegistrationDocument>,
    private readonly mailService: MailService,
    private readonly dateUtils: DateUtil,
    private readonly accountUser: AccountUserService,
    private readonly authenUserService: AuthenticationService,
    private readonly readingRoomService: ReadingRoomService,
    private readonly freeTrialProductService: FreeTrialProductService,
    private readonly regularProductService: RegularProductService,
  ) {}

  async getCourseRegistrationById(
    id?: string,
    isTrial?: boolean,
  ): Promise<any> {
    const data = isTrial
      ? await this.courseRegistrationModel.findById({
          _id: new mongoose.Types.ObjectId(id),
        })
      : await this.regularCourseRegistrationModel.findById({
          _id: new mongoose.Types.ObjectId(id),
        });
    return data;
  }

  async createEvents(idDto: IdDto, isTrial: boolean): Promise<ReadingRoom> {
    const data = await this.readingRoomService.getReadingRoomById(idDto, null);

    const detailsCourse = isTrial
      ? data.course_registration_id
      : data.regular_course_registration_id;

    if (detailsCourse) {
      const CourseDetails = isTrial
        ? await this.getCourseRegistrationById(detailsCourse.toString(), true)
        : await this.getCourseRegistrationById(detailsCourse.toString(), false);
      if (!CourseDetails) {
        throw new BadRequestException(httpErrors.PRODUCT_NOT_FOUND);
      }
      const class_per_week = CourseDetails['class_per_week'];
      const productDetails = isTrial
        ? await this.freeTrialProductService.getFreeTrialProductByName(
            CourseDetails.course,
          )
        : await this.regularProductService.getRegularProductByName(
            CourseDetails.course,
          );
      if (!productDetails) {
        throw new BadRequestException(httpErrors.PRODUCT_NOT_FOUND);
      }
      console.log({ productDetails });

      const eventsList = await this.dateUtils.calculateNeededDaysWithTime(
        productDetails.reg_day,
        productDetails.exp_day,
        class_per_week,
      );
      const payload = {
        timeline_events: eventsList,
      };
      console.log({ payload });

      return await this.readingRoomService.findByIdAndUpdateReadingRoom(
        data._id,
        payload,
      );
    } else {
      throw new BadRequestException(httpErrors.ROOM_NOT_FOUND);
    }
  }

  async create(data: CourseRegistrationDto): Promise<ReadingRoom> {
    const { email, password } = data;
    // const payload = { email, password } as CreateAccountUserDto;
    const signIn = { email, password } as LoginDto;

    const user = await this.accountUser.findOne({
      email,
      status: UserStatus.ACTIVE,
    });
    if (!user) {
      throw new BadRequestException(httpErrors.ACCOUNT_NOT_FOUND);
    } else {
      const signInResponse = await this.authenUserService.login(signIn);
      if (signInResponse.accessToken) {
        const registeredCourse = await this.courseRegistrationModel.findOne({
          user_account: new mongoose.Types.ObjectId(user._id),
        });

        if (registeredCourse) {
          throw new BadRequestException(httpErrors.PRODUCT_EXISTED);
        }

        await Promise.all([
          await this.mailService.sendMailToUser(data),
          await this.mailService.sendMailToAdmin(data),
        ]);

        delete data.email;
        delete data.password;

        const res = await this.courseRegistrationModel.create({
          ...data,
          user_account: new mongoose.Types.ObjectId(user._id),
        });

        const readingRoomDetails =
          await this.readingRoomService.findByStudentIdAndUpdateReadingRoom(
            user._id,
            res._id,
            true,
          );
        if (!readingRoomDetails) {
          throw new BadRequestException(httpErrors.ROOM_NOT_FOUND);
        }

        const payload = { id: readingRoomDetails._id } as IdDto;
        return await this.createEvents(payload, true);
      }
    }
  }
}
