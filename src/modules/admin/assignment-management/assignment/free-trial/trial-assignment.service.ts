import { Injectable } from '@nestjs/common';
import { ReadingRoom } from 'src/modules/user/reading-room/schemas/reading-room.schema';
import { ReadingRoomService } from 'src/modules/user/reading-room/reading-room.service';
import { IdDto } from 'src/shares/dtos/param.dto';
import { WorkingHoursService } from 'src/modules/admin/teacher-management/working-hours/working-hours.service';
import { TimelineDto } from 'src/modules/admin/teacher-management/working-hours/dto/get-working-hours.dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  AccountTeacher,
  AccountTeacherDocument,
} from 'src/modules/admin/teacher-management/account-teacher/schemas/account-teacher.schema';
import { Model } from 'mongoose';

@Injectable()
export class TrialAssignmentService {
  constructor(
    @InjectModel(AccountTeacher.name)
    private readonly accountTeacherModel: Model<AccountTeacherDocument>,
    private readingRoomService: ReadingRoomService,
    private readonly workingHoursService: WorkingHoursService,
    // private regularCourseRegistrationService: RegularCourseRegistrationService,
  ) {}
  populateTeacher = [
    {
      path: 'teacher_id',
      model: this.accountTeacherModel,
    },
  ];
  async getData(): Promise<ReadingRoom[]> {
    return await this.readingRoomService.getReadingRoom();
  }

  async getEventByReadingRoom(idDto: IdDto): Promise<ReadingRoom> {
    return await this.readingRoomService.getReadingRoomById(idDto);
  }

  async getTeachersByDayTime(data: TimelineDto): Promise<AccountTeacher[]> {
    const workingHourDetails =
      await this.workingHoursService.getWorkingHoursByDayAndTime(data);
    const teacherDetails = workingHourDetails.populate(this.populateTeacher);
    console.log({ teacherDetails });
    console.log({ workingHourDetails });

    return teacherDetails;
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
