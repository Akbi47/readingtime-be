import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePointPenaltyManagementDto } from './dto/create-point-penalty-management.dto';
import {
  PointPenaltyManagement,
  PointPenaltyManagementDocument,
} from 'src/schemas/admin/teacher-management/point-penalty-management.schema';
import { TimelineDto } from './schemas/point-penalty-management.schema';
// import { ClassFeedback } from '../class-feedback/interface/class-feedback.interface';

@Injectable()
export class PointPenaltyManagementService {
  constructor(
    // @InjectModel('ClassFeedback')
    // private readonly classFeedbackModel: Model<ClassFeedback>,
    @InjectModel(PointPenaltyManagement.name)
    private pointPenaltyManagementModel: Model<PointPenaltyManagementDocument>,
  ) {}

  async getPointPenaltyManagement(
    dateParam: TimelineDto,
  ): Promise<PointPenaltyManagement[]> {
    const { month, year } = dateParam;
    return this.pointPenaltyManagementModel.find({
      date: { $elemMatch: { month, year } },
    });
  }

  // async getPointsAndPenaltiesInMonth(
  //   month: number,
  //   year: number,
  // ): Promise<any> {
  //   const startDate = new Date(year, month - 1, 1);
  //   const endDate = new Date(year, month, 0);

  //   const pointPromises = this.classFeedbackModel
  //     .find({
  //       Class_Datetime: { $gte: startDate, $lte: endDate },
  //       Score: { $gt: 0 },
  //     })
  //     .select('Teacher_Name Team_Name Class_Datetime Comment Score')
  //     .exec();

  //   const penaltyPromises = this.classFeedbackModel
  //     .find({
  //       createdAt: { $gte: startDate, $lte: endDate },
  //       Score: { $lt: 0 },
  //     })
  //     .select(
  //       'Teacher_Name Team_Name Class_Datetime Comment Score Division Items Texts',
  //     )
  //     .exec();

  //   const [points, penalties] = await Promise.all([
  //     pointPromises,
  //     penaltyPromises,
  //   ]);

  //   const result = {
  //     points: points.map((point) => ({
  //       teacherName: point.Teacher_Name,
  //       team: point.Team_Name,
  //       time: point.Class_Datetime,
  //       comment: point.Teacher_Comment,
  //       score: point.Score,
  //     })),
  //     penalties: penalties.map((penalty) => ({
  //       teacherName: penalty.Teacher_Name,
  //       team: penalty.Team_Name,
  //       time: penalty.Class_Datetime,
  //       comment: penalty.Teacher_Comment,
  //       score: penalty.Score,
  //     })),
  //   };

  //   return result;
  // }

  async createPointPenaltyManagement(
    createPointPenaltyManagementDto: CreatePointPenaltyManagementDto,
  ): Promise<PointPenaltyManagement> {
    const data = await this.pointPenaltyManagementModel.create(
      createPointPenaltyManagementDto,
    );
    return data;
  }
}
