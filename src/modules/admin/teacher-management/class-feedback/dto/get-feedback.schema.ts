import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { ClassFeedbackStatus } from 'src/shares/enums/account-teacher.enum';

@Schema({ timestamps: true })
export class GetClassFeedbackDto {
  @Prop({ required: false, type: String })
  team: string;

  @Prop({ required: false, type: String })
  teacher: string;

  @Prop({ required: false, type: String })
  paper_no: string;

  @Prop({ required: false, type: String })
  date: string;

  @Prop({ required: false, type: String })
  video: string;

  @Prop({ required: false, type: String })
  feedback: string;

  @Prop({ required: false, type: String })
  score: string;

  @Prop({ required: false, type: String })
  teacher_comment: string;

  @Prop({ required: false, type: String, enum: ClassFeedbackStatus })
  status: ClassFeedbackStatus;
}


