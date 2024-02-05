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
import { TimelineDto } from './dto/get-working-hours.dto';
import {
  AccountTeacher,
  AccountTeacherDocument,
} from '../account-teacher/schemas/account-teacher.schema';

@Injectable()
export class WorkingHoursService {
  constructor(
    @InjectModel(AccountTeacher.name)
    private readonly accountTeacherModel: Model<AccountTeacherDocument>,
    @InjectModel(WorkingHours.name)
    private readonly workingHoursModel: Model<WorkingHoursDocument>,
    private readonly accountTeacherService: AccountTeacherService,
  ) {}
  populateTeacher = [
    {
      path: 'teacher_id',
      model: this.accountTeacherModel,
    },
  ];
  async getWorkingHours(): Promise<WorkingHours[]> {
    return this.workingHoursModel.find().exec();
  }

  async getWorkingHoursById(_id: string): Promise<WorkingHours> {
    return this.workingHoursModel.findById(_id).exec();
  }

  async getWorkingHoursByDayAndTime(
    data: TimelineDto,
  ): Promise<WorkingHours[]> {
    const { days, time_start, time_end } = data;

    const res = await this.workingHoursModel
      .find({
        timesheet: {
          $elemMatch: {
            days,
            time_start,
          },
        },
      })
      .populate(this.populateTeacher);
    return res;
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
    const data = await this.workingHoursModel.create({
      timesheet: createWorkingHoursDto.timesheet,
      teacher_id: new mongoose.Types.ObjectId(teacherInfos._id),
    });
    return data;
  }

  async updateWorkingHours(WorkingHours: WorkingHoursDocument): Promise<void> {
    const { _id, ...updatedData } = WorkingHours;
    await this.workingHoursModel
      .findOneAndUpdate({ _id }, updatedData, {
        new: true,
      })
      .exec();
  }
}
