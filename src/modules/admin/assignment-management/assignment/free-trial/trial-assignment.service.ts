import { Injectable } from '@nestjs/common';
import { AccountUserService } from 'src/modules/admin/user-management/account-user/account-user.service';
import { ReadingRoom } from 'src/modules/user/reading-room/schemas/reading-room.schema';
import { ReadingRoomService } from 'src/modules/user/reading-room/reading-room.service';
import { IdDto } from 'src/shares/dtos/param.dto';
import { CourseRegistrationService } from 'src/modules/user/course-registration/course-registration.service';
import { FreeTrialProductService } from 'src/modules/admin/product-management/free-trial-product/free-trial-product.service';
import * as moment from 'moment';
import { GetEventDto } from 'src/modules/user/reading-room/dto/get-timeline-event.dto';

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

  async getEventByReadingRoom(idDto: IdDto): Promise<ReadingRoom> {
    return await this.readingRoomService.getReadingRoomById(idDto);
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
