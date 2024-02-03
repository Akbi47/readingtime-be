import { Injectable } from '@nestjs/common';
import { AccountUserService } from 'src/modules/admin/user-management/account-user/account-user.service';
import { ReadingRoom } from 'src/modules/user/reading-room/schemas/reading-room.schema';
import { ReadingRoomService } from 'src/modules/user/reading-room/reading-room.service';
import { IdDto } from 'src/shares/dtos/param.dto';
import { CourseRegistrationService } from 'src/modules/user/course-registration/course-registration.service';
import { FreeTrialProductService } from 'src/modules/admin/product-management/free-trial-product/free-trial-product.service';
import * as moment from 'moment';
import { GetEventDto } from 'src/modules/user/course-registration/dto/get-event.dto';

@Injectable()
export class TrialAssignmentService {
  constructor(
    private accountUser: AccountUserService,
    private readingRoomService: ReadingRoomService,
    private courseRegistrationService: CourseRegistrationService,
    private freeTrialProductService: FreeTrialProductService,
    // private regularCourseRegistrationService: RegularCourseRegistrationService,
  ) {}
  async getData(): Promise<ReadingRoom[]> {
    return await this.readingRoomService.getReadingRoom();
  }

  async calculateNeededDaysWithTime(start_day, end_day, need_day) {
    const startDate = moment(start_day, 'YYYY/MM/DD');
    const endDate = moment(end_day, 'YYYY/MM/DD');

    let currentDate = startDate.clone();
    const result = [];

    while (currentDate <= endDate) {
      const matchingDay = need_day.find(
        (item) => item.days === currentDate.format('dddd').toLowerCase(),
      );

      if (matchingDay) {
        const [timeStart, timeEnd] = matchingDay.time.split('~');
        result.push({
          day: currentDate.format('dddd'),
          date: currentDate.format('D'),
          month: currentDate.format('M'),
          year: currentDate.format('YYYY'),
          timeStart,
          timeEnd,
        });
      }
      currentDate.add(1, 'day');
    }

    return result;
  }

  async getEvents(idDto: IdDto): Promise<GetEventDto[]> {
    const data = await this.readingRoomService.getReadingRoomById(idDto);
    if (data.course_registration_id) {
      const trialCourseDetails =
        await this.courseRegistrationService.getCourseRegistrationById(
          data.course_registration_id.toString(),
        );

      const class_per_week = trialCourseDetails['class_per_week'];
      const trialProductDetails =
        await this.freeTrialProductService.getFreeTrialProductByName(
          trialCourseDetails.course,
        );
      console.log({ trialProductDetails });
      const eventsList = await this.calculateNeededDaysWithTime(
        trialProductDetails.reg_day,
        trialProductDetails.exp_day,
        class_per_week,
      );
      return eventsList;
    }
  }
  async createEvents(idDto: IdDto): Promise<GetEventDto[]> {
    const data = await this.readingRoomService.getReadingRoomById(idDto);
    if (data.course_registration_id) {
      const trialCourseDetails =
        await this.courseRegistrationService.getCourseRegistrationById(
          data.course_registration_id.toString(),
        );

      const class_per_week = trialCourseDetails['class_per_week'];
      const trialProductDetails =
        await this.freeTrialProductService.getFreeTrialProductByName(
          trialCourseDetails.course,
        );
      console.log({ trialProductDetails });
      const eventsList = await this.calculateNeededDaysWithTime(
        trialProductDetails.reg_day,
        trialProductDetails.exp_day,
        class_per_week,
      );
      return eventsList;
    }
  }
  // async updateAssignment(
  //   trialAssignmentDto: TrialAssignmentDto,
  // ): Promise<void> {
  //   const { _id, ...updatedData } = trialAssignmentDto;
  //   const user = await this.accountUserModel.findById(_id);

  //   if (!user) {
  //     throw new BadRequestException(httpErrors.ACCOUNT_NOT_FOUND);
  //   }
  //   if (updatedData.password) {
  //     await this.findByIdAndUpdateEmail(_id, updatedData.password);
  //   }
  //   delete updatedData.password;
  //   await this.accountUserModel.findOneAndUpdate({ _id }, updatedData, {
  //     new: true,
  //   });
  // }
}
