import { Body, Controller, Get, Param, Put, Query } from '@nestjs/common';
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
  @Get('events-readingroom/:id')
  async getEvents(@Param() idDto: IdDto) {
    return await this.trialAssignmentService.getEventByReadingRoom(idDto);
  }

  @Get('daytime')
  async getTeachersByDayTime(
    @Query() timelineDto: TimelineDto,
  ): Promise<ResponseData<AccountTeacher[]>> {
    try {
      const data =
        await this.trialAssignmentService.getTeachersByDayTime(timelineDto);
      return new ResponseData<AccountTeacher[]>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<AccountTeacher[]>(
        error,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }
  // @Put()
  // async updateAssignment(
  //   @Body() trialAssignmentDto: TrialAssignmentDto,
  // ): Promise<void> {
  //   await this.trialAssignmentService.updateAssignment(trialAssignmentDto);
  // }
}
