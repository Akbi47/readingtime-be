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
import { GetEventDto } from '../reading-room/dto/get-timeline-event.dto';
import { IdDto } from 'src/shares/dtos/param.dto';
import { FreeTrialProductService } from 'src/modules/admin/product-management/free-trial-product/free-trial-product.service';
import { CreateTimelineEventDto } from '../reading-room/dto/create-timeline-event.dto';
import { ReadingRoom } from '../reading-room/schemas/reading-room.schema';

@Injectable()
export class CourseRegistrationService {
  constructor(
    @InjectModel(CourseRegistration.name)
    private readonly courseRegistrationModel: Model<CourseRegistrationDocument>,
    private readonly mailService: MailService,
    private readonly dateUtils: DateUtil,
    private readonly accountUser: AccountUserService,
    private readonly authenUserService: AuthenticationService,
    private readonly readingRoomService: ReadingRoomService,
    private readonly freeTrialProductService: FreeTrialProductService,
  ) {}

  async getCourseRegistrationById(id?: string): Promise<any> {
    const data = await this.courseRegistrationModel.findById({
      _id: new mongoose.Types.ObjectId(id),
    });
    return data;
  }

  async createEvents(idDto: IdDto): Promise<ReadingRoom> {
    const data = await this.readingRoomService.getReadingRoomById(idDto);
    if (data.course_registration_id) {
      const trialCourseDetails = await this.getCourseRegistrationById(
        data.course_registration_id.toString(),
      );
      console.log(trialCourseDetails);
      if (!trialCourseDetails) {
        throw new BadRequestException(httpErrors.PRODUCT_NOT_FOUND);
      }
      const class_per_week = trialCourseDetails['class_per_week'];
      const trialProductDetails =
        await this.freeTrialProductService.getFreeTrialProductByName(
          trialCourseDetails.course,
        );
      if (!trialProductDetails) {
        throw new BadRequestException(httpErrors.PRODUCT_NOT_FOUND);
      }
      console.log(trialProductDetails);

      console.log({
        trialProductDetails: trialProductDetails.reg_day,
        trialProductDetails2: trialProductDetails.exp_day,
        class_per_week,
      });

      const eventsList = await this.dateUtils.calculateNeededDaysWithTime(
        trialProductDetails.reg_day,
        trialProductDetails.exp_day,
        class_per_week,
      );
      const payload = {
        timeline_events: eventsList,
      };
      return await this.readingRoomService.findByIdAndUpdateReadingRoom(
        data._id,
        payload,
      );
    }
  }

  async create(data: CourseRegistrationDto): Promise<CourseRegistration> {
    const { email, password } = data;
    // const payload = { email, password } as CreateAccountUserDto;
    const signIn = { email, password } as LoginDto;

    const user = await this.accountUser.findOne({
      email,
      status: UserStatus.ACTIVE,
    });
    if (!user) {
      throw new BadRequestException(httpErrors.ACCOUNT_NOT_FOUND);
    }
    if (user) {
      const signInResponse = await this.authenUserService.login(signIn);
      if (signInResponse.accessToken) {
        const registeredCourse = await this.courseRegistrationModel.findOne({
          user_account: new mongoose.Types.ObjectId(user._id),
        });

        if (registeredCourse) {
          throw new BadRequestException(httpErrors.PRODUCT_EXISTED);
        }

        // await Promise.all([
        //   await this.mailService.sendMailToUser(data),
        //   await this.mailService.sendMailToAdmin(data),
        // ]);

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

        const payload = { id: readingRoomDetails._id } as IdDto;
        await this.createEvents(payload);
        return res;
      }
    }
  }
}
