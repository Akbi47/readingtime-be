import { BadRequestException, Injectable } from '@nestjs/common';
import {
  ReadingRoom,
  ReadingRoomDocument,
} from 'src/modules/user/reading-room/schemas/reading-room.schema';
import { ReadingRoomService } from 'src/modules/user/reading-room/reading-room.service';
import { IdDto } from 'src/shares/dtos/param.dto';
import { WorkingHoursService } from 'src/modules/admin/teacher-management/working-hours/working-hours.service';
import { TimelineDto } from 'src/modules/admin/teacher-management/working-hours/dto/get-working-hours.dto';
import { TimelineDto as UpdateTimeLineSubstituteTeacherDto } from 'src/modules/user/reading-room/dto/update-teacher-id-room.dto';
import { WorkingHours } from 'src/modules/admin/teacher-management/working-hours/schemas/working-hours.schema';
import { httpErrors } from 'src/shares/exceptions';
import { UpdateTeacherRoomDto } from 'src/modules/user/reading-room/dto/update-teacher-id-room.dto';
import { Timeline } from 'src/modules/user/course-registration/schemas/course-registration.schema';

@Injectable()
export class RegularAssignmentService {
  constructor(
    private readingRoomService: ReadingRoomService,
    private readonly workingHoursService: WorkingHoursService,
    // private regularCourseRegistrationService: RegularCourseRegistrationService,
  ) {}

  async getData(): Promise<ReadingRoom[]> {
    return await this.readingRoomService.getReadingRoom(false);
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

  async assignTeacher(
    teacher_id: IdDto,
    room_id: string,
    timeline?: Timeline,
  ): Promise<void> {
    const roomDetails = await this.getEventByReadingRoom(room_id, null);
    console.log(roomDetails);

    if (!roomDetails) {
      throw new BadRequestException(httpErrors.ROOM_NOT_FOUND);
    }
    const isSubstitute = !!roomDetails.teacher_id;
    if (!isSubstitute) {
      const payload = {
        teacher_id: teacher_id.id,
      } as UpdateTeacherRoomDto;
      await this.readingRoomService.findByIdAndUpdateReadingRoom(
        roomDetails._id,
        payload,
      );
    } else {
      const findTeacherId = teacher_id.id === roomDetails.teacher_id.toString();
      if (findTeacherId) {
        throw new BadRequestException(httpErrors.TEACHER_EXISTED);
      } else {
        const payload = {
          days: timeline.days,
          time: timeline.time,
          teacher_id: teacher_id.id,
        } as UpdateTimeLineSubstituteTeacherDto;
        const classPerWeek = {
          class_per_week: [payload],
        } as UpdateTeacherRoomDto;
        await this.readingRoomService.findByIdAndUpdateReadingRoom(
          roomDetails._id,
          classPerWeek,
        );
      }
    }
  }
}
