import { Body, Controller, Get, Post } from '@nestjs/common';
import { TrialAssignmentService } from './trial-assignment.service';


@Controller('trial-assignment')
export class TrialAssignmentController {
  constructor(
    private readonly trialAssignmentService: TrialAssignmentService,
  ) {}
  @Get()
  async getData() {
    return await this.trialAssignmentService.getData();
  }
}
