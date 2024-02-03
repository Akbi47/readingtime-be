import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { TrialAssignmentService } from './trial-assignment.service';
import { TrialAssignmentDto } from './dto/trial-assignment.dto';
import { IdDto } from 'src/shares/dtos/param.dto';

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
  // @Put()
  // async updateAssignment(
  //   @Body() trialAssignmentDto: TrialAssignmentDto,
  // ): Promise<void> {
  //   await this.trialAssignmentService.updateAssignment(trialAssignmentDto);
  // }
}
