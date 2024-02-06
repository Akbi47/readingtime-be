import { BadRequestException, Injectable } from '@nestjs/common';
import {
  ReadingRoom,
  ReadingRoomDocument,
} from 'src/modules/user/reading-room/schemas/reading-room.schema';
import { ReadingRoomService } from 'src/modules/user/reading-room/reading-room.service';
import { IdDto } from 'src/shares/dtos/param.dto';
import { WorkingHoursService } from 'src/modules/admin/teacher-management/working-hours/working-hours.service';
import { TimelineDto } from 'src/modules/admin/teacher-management/working-hours/dto/get-working-hours.dto';
import { WorkingHours } from 'src/modules/admin/teacher-management/working-hours/schemas/working-hours.schema';
import { httpErrors } from 'src/shares/exceptions';
import { UpdateTeacherRoomDto } from 'src/modules/user/reading-room/dto/update-teacher-id-room.dto';

@Injectable()
export class TrialAssignmentService {
  constructor(
    private readingRoomService: ReadingRoomService,
    private readonly workingHoursService: WorkingHoursService,
    // private regularCourseRegistrationService: RegularCourseRegistrationService,
  ) {}

  async getData(): Promise<ReadingRoom[]> {
    return await this.readingRoomService.getReadingRoom(true);
  }

  async getEventByReadingRoom(
    idDto: IdDto | string,
    teacher_id?: IdDto,
  ): Promise<ReadingRoomDocument> {
    return await this.readingRoomService.getReadingRoomById(idDto, teacher_id);
  }

  async getTeachersByDayTime(data: TimelineDto): Promise<WorkingHours[]> {
    const workingHourDetails =
      await this.workingHoursService.getWorkingHoursByDayAndTime(data);
    return workingHourDetails;
  }

  async assignTeacher(teacher_id: IdDto, room_id: string): Promise<void> {
    const roomDetails = await this.getEventByReadingRoom(room_id, null);
    // const findTeacherId = roomDetails.teacher_id.map((e) => {
    //   return e.toString() === teacher_id.id;
    // });
    const findTeacherId = teacher_id.id === roomDetails.teacher_id.toString();
    if (findTeacherId) {
      throw new BadRequestException(httpErrors.TEACHER_EXISTED);
    } else {
      const payload = {
        teacher_id: teacher_id.id,
      } as UpdateTeacherRoomDto;
      await this.readingRoomService.findByIdAndUpdateReadingRoom(
        roomDetails._id,
        payload,
      );
    }
  }
}
