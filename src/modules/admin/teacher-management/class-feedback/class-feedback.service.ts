import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  ClassFeedback,
  ClassFeedbackDocument,
} from './schemas/class-feedback.schema';
import { CreateClassFeedbackDto } from './dto/create-class-feedback.schema';

@Injectable()
export class ClassFeedbackService {
  constructor(
    @InjectModel('ClassFeedback')
    private readonly ClassFeedbackModel: Model<ClassFeedbackDocument>,
  ) {}

  async getClassFeedback(): Promise<ClassFeedback[]> {
    return this.ClassFeedbackModel.find();
  }

  async createClassFeedback(
    classFeedbackDto: CreateClassFeedbackDto,
  ): Promise<ClassFeedback> {
    return await this.ClassFeedbackModel.create(classFeedbackDto);
  }
}
