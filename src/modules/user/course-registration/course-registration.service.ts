import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import {
  CourseRegistration,
  CourseRegistrationDocument,
} from './schemas/course-registration.schema';
import { CourseRegistrationDto } from './dto/course-registration.dto';
import { MailService } from 'src/modules/mail/mail.service';
import CreateAccountUserDto from 'src/modules/admin/user-management/account-user/dto/create-account-user.dto';
import { UserStatus } from 'src/shares/enums/account-user.enum';
import { AccountUserService } from 'src/modules/admin/user-management/account-user/account-user.service';
import { httpErrors } from 'src/shares/exceptions';
import { ReadingRoomService } from '../reading-room/reading-room.service';
import { AuthenticationService } from 'src/modules/authentication/authentication.service';
import { LoginDto } from 'src/modules/authentication/dto/login.dto';

@Injectable()
export class CourseRegistrationService {
  constructor(
    @InjectModel(CourseRegistration.name)
    private readonly courseRegistrationModel: Model<CourseRegistrationDocument>,
    private readonly mailService: MailService,
    private accountUser: AccountUserService,
    private authenUserService: AuthenticationService,
    private readingRoomService: ReadingRoomService,
  ) {}

  async getCourseRegistrationById(id?: string): Promise<any> {
    const data = await this.courseRegistrationModel.findById({
      _id: new mongoose.Types.ObjectId(id),
    });
    return data;
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

        await Promise.all([
          await this.mailService.sendMailToUser(data),
          await this.mailService.sendMailToAdmin(data),
        ]);

        // delete data.email;
        delete data.password;
        console.log({
          data,
          user_id: user._id,
        });

        const res = await this.courseRegistrationModel.create({
          ...data,
          user_account: new mongoose.Types.ObjectId(user._id),
        });

        await this.readingRoomService.findByIdAndUpdateReadingRoom(
          user._id,
          res._id,
          true,
        );

        return res;
      }
    }
  }
}
