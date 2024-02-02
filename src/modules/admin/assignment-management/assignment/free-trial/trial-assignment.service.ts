import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { UserStatus } from 'src/shares/enums/account-user.enum';
import { AccountUserService } from 'src/modules/admin/user-management/account-user/account-user.service';
import { httpErrors } from 'src/shares/exceptions';
import { ReadingRoom } from 'src/modules/user/reading-room/schemas/reading-room.schema';
import { ReadingRoomService } from 'src/modules/user/reading-room/reading-room.service';
import { IdDto } from 'src/shares/dtos/param.dto';
import { CourseRegistrationService } from 'src/modules/user/course-registration/course-registration.service';
import { FreeTrialProductService } from 'src/modules/admin/product-management/free-trial-product/free-trial-product.service';

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
  async getEvents(idDto: IdDto): Promise<unknown[]> {
    const data = await this.readingRoomService.getReadingRoomById(idDto);
    console.log({ data });
    if (data.course_registration_id) {
      const trialCourseDetails =
        await this.courseRegistrationService.getCourseRegistrationById(
          data.course_registration_id.toString(),
        );
      // const class_per_week = trialCourseDetails.class_per_week.map((obj) => {
      //   console.log(obj);
      // });
      console.log(trialCourseDetails['class_per_week']);

      console.log({ trialCourseDetails });

      const trialProductDetails =
        await this.freeTrialProductService.getFreeTrialProductByName(
          trialCourseDetails.course,
        );
      console.log({ trialProductDetails });
    }
    //  else if (data.regular_course_registration_id) {
    //   const course =
    //     await this.regularCourseRegistrationService.getRegularCourseRegistrationById(
    //       data.regular_course_registration_id.toString(),
    //     );

    //   console.log(course);
    // }
    return [];
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
