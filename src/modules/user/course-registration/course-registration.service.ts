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

@Injectable()
export class CourseRegistrationService {
  constructor(
    @InjectModel(CourseRegistration.name)
    private readonly courseRegistrationModel: Model<CourseRegistrationDocument>,
    private readonly mailService: MailService,
    private accountUser: AccountUserService,
    private readingRoomService: ReadingRoomService,
  ) {}
  async create(data: CourseRegistrationDto): Promise<CourseRegistration> {
    const { email, password } = data;
    const payload = { email, password } as CreateAccountUserDto;

    const user = await this.accountUser.findOne({
      email,
      status: UserStatus.ACTIVE,
    });
    if (user) {
      throw new BadRequestException(httpErrors.ACCOUNT_EXISTED);
    }
    const regUser = await this.accountUser.createStudent(payload);

    await Promise.all([
      await this.mailService.sendMailToUser(data),
      await this.mailService.sendMailToAdmin(data),
    ]);

    delete data.email;
    delete data.password;

    const res = await this.courseRegistrationModel.create({
      ...data,
      user_account: new mongoose.Types.ObjectId(regUser._id),
    });

    await this.readingRoomService.findByIdAndUpdateReadingRoom(
      regUser._id,
      res._id,
    );

    return res;
  }
}
