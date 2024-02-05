import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Put,
  Query,
} from '@nestjs/common';
import { TrialAssignmentService } from './trial-assignment.service';
import { IdDto } from 'src/shares/dtos/param.dto';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';
import { WorkingHours } from 'src/modules/admin/teacher-management/working-hours/schemas/working-hours.schema';
import { TimelineDto } from 'src/modules/admin/teacher-management/working-hours/dto/get-working-hours.dto';
import { AccountTeacher } from 'src/modules/admin/teacher-management/account-teacher/schemas/account-teacher.schema';

@Controller('trial-assignment')
export class TrialAssignmentController {
  constructor(
    private readonly trialAssignmentService: TrialAssignmentService,
  ) {}
  @Get()
  async getData() {
    return await this.trialAssignmentService.getData();
  }

  @Get('/daytime')
  async getTeachersByDayTime(
    @Query() timelineDto: TimelineDto,
  ): Promise<ResponseData<WorkingHours[]>> {
    try {
      const data =
        await this.trialAssignmentService.getTeachersByDayTime(timelineDto);
      return new ResponseData<WorkingHours[]>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<WorkingHours[]>(
        error,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }
  @Patch('assign-teacher/:id')
  async assignTeacher(
    @Param() teacher_id: IdDto,
    @Query() room_id: string,
  ): Promise<void> {
    console.log({ teacher_id, room_id });

    await this.trialAssignmentService.assignTeacher(teacher_id, room_id);
  }
  @Get('events-readingroom/:id')
  async getEvents(@Param() idDto: IdDto) {
    return await this.trialAssignmentService.getEventByReadingRoom(idDto);
  }
}
