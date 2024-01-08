import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClassFeedback } from './interface/class-feedback.interface';
import { ClassFeedbackDto } from './dto/class-feedback.dto';

@Injectable()
export class ClassFeedbackService {
  constructor(
    @InjectModel('ClassFeedback')
    private readonly ClassFeedbackModel: Model<ClassFeedback>,
  ) {}

  async getClassFeedback(): Promise<ClassFeedback[]> {
    return this.ClassFeedbackModel.find().exec();
  }

  async createClassFeedback(
    classFeedbackDto: ClassFeedbackDto,
  ): Promise<ClassFeedback> {
    const createdClassFeedback = new this.ClassFeedbackModel(classFeedbackDto);
    return createdClassFeedback.save();
  }
}
