import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClassFeedbackController } from './class-feedback.controller';
import { ClassFeedbackSchema } from '../../../../schemas/admin/teacher-management/class_feedback.schema';
import { ClassFeedbackService } from './class-feedback.service';
import { ClassFeedback } from './schemas/class-feedback.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ClassFeedback.name,
        schema: ClassFeedbackSchema,
      },
    ]),
  ],
  controllers: [ClassFeedbackController],
  providers: [ClassFeedbackService],
})
export class ClassFeedbackModule {}
