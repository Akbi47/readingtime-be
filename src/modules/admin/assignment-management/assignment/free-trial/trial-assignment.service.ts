import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { UserStatus } from 'src/shares/enums/account-user.enum';
import { AccountUserService } from 'src/modules/admin/user-management/account-user/account-user.service';
import { httpErrors } from 'src/shares/exceptions';
import { ReadingRoom } from 'src/modules/user/reading-room/schemas/reading-room.schema';
import { ReadingRoomService } from 'src/modules/user/reading-room/reading-room.service';

@Injectable()
export class TrialAssignmentService {
  constructor(
    private accountUser: AccountUserService,
    private readingRoomService: ReadingRoomService,
  ) {}
  async getData(): Promise<ReadingRoom[]> {
    return await this.readingRoomService.getReadingRoom();
  }
}
