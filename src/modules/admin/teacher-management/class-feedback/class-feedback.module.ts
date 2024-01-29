import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClassFeedbackController } from './class-feedback.controller';
import { ClassFeedbackService } from './class-feedback.service';
import {
  ClassFeedback,
  ClassFeedbackSchema,
} from './schemas/class-feedback.schema';

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
