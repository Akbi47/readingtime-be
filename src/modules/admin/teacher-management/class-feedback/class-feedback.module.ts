import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClassFeedbackController } from './class-feedback.controller';
import { ClassFeedbackSchema } from '../../../../schemas/admin/teacher-management/class_feedback.schema';
import { ClassFeedbackService } from './class-feedback.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'ClassFeedback',
        schema: ClassFeedbackSchema,
      },
    ]),
  ],
  controllers: [ClassFeedbackController],
  providers: [ClassFeedbackService],
})
export class ClassFeedbackModule {}
