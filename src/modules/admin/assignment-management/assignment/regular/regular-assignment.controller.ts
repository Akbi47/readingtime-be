import { Body, Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { RegularAssignmentService } from './regular-assignment.service';
import { IdDto } from 'src/shares/dtos/param.dto';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';
import { WorkingHours } from 'src/modules/admin/teacher-management/working-hours/schemas/working-hours.schema';
import { TimelineDto } from 'src/modules/admin/teacher-management/working-hours/dto/get-working-hours.dto';
import { Timeline } from 'src/modules/user/reading-room/schemas/reading-room.schema';

@Controller('regular-assignment')
export class RegularAssignmentController {
  constructor(
    private readonly regularAssignmentService: RegularAssignmentService,
  ) {}
  @Get()
  async getData() {
    return await this.regularAssignmentService.getData();
  }

  @Get('/daytime')
  async getTeachersByDayTime(
    @Query() timelineDto: TimelineDto,
  ): Promise<ResponseData<WorkingHours[]>> {
    try {
      const data =
        await this.regularAssignmentService.getTeachersByDayTime(timelineDto);
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
    @Body() timeline?: Timeline,
  ): Promise<void> {
    await this.regularAssignmentService.assignTeacher(
      teacher_id,
      room_id,
      timeline,
    );
  }
  @Get('events-readingroom/:id')
  async getEvents(@Param() idDto: IdDto) {
    return await this.regularAssignmentService.getEventByReadingRoom(idDto);
  }
}
