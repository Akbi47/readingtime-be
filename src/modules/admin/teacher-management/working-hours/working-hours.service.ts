import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import {
  WorkingHours,
  WorkingHoursDocument,
} from './schemas/working-hours.schema';
import { CreateWorkingHoursDto } from './dto/create-working-hours.dto';
import { AccountTeacherService } from '../account-teacher/account-teacher.service';
import GetAccountTeacherDto from '../account-teacher/dto/get-account-teacher.dto';
import { httpErrors } from 'src/shares/exceptions';

@Injectable()
export class WorkingHoursService {
  constructor(
    @InjectModel('WorkingHours')
    private readonly createWorkingHoursModel: Model<WorkingHoursDocument>,
    private readonly accountTeacherService: AccountTeacherService,
  ) {}

  async getWorkingHours(): Promise<WorkingHours[]> {
    return this.createWorkingHoursModel.find().exec();
  }

  async getWorkingHoursById(_id: string): Promise<WorkingHours> {
    return this.createWorkingHoursModel.findById(_id).exec();
  }

  async createWorkingHours(
    createWorkingHoursDto: CreateWorkingHoursDto,
  ): Promise<WorkingHours | any> {
    const { team_leader, team_name, nick_name, teacher } =
      createWorkingHoursDto;

    const payload = {
      team_leader,
      team_name,
      nick_name,
      teacher,
    } as GetAccountTeacherDto;

    const teacherInfos =
      await this.accountTeacherService.getTeacherByInfo(payload);
    if (!teacherInfos) {
      throw new BadRequestException(httpErrors.ACCOUNT_NOT_FOUND);
    }
    console.log({ teacherInfos });
    const data = await this.createWorkingHoursModel.create({
      timesheet: createWorkingHoursDto.timesheet,
      teacher_id: new mongoose.Types.ObjectId(teacherInfos._id),
    });
    return data;
  }

  async updateWorkingHours(WorkingHours: WorkingHoursDocument): Promise<void> {
    const { _id, ...updatedData } = WorkingHours;
    await this.createWorkingHoursModel
      .findOneAndUpdate({ _id }, updatedData, {
        new: true,
      })
      .exec();
  }
}
