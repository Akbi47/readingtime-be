import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AccountTeacher } from '../../account-teacher/schemas/account-teacher.schema';
import { Days } from 'src/shares/enums/timeline.enum';

export type WorkingHoursDocument = WorkingHours & Document;
@Schema({ _id: false })
export class Timeline {
  @Prop({ required: false, type: String, enum: Days })
  days: Days;

  @Prop({ required: false, type: String })
  time: string;
}
export const TimelineSchema = SchemaFactory.createForClass(Timeline);
@Schema({ timestamps: true })
export class WorkingHours {
  @Prop({
    required: true,
    type: String,
    ref: AccountTeacher.name,
  })
  teacher_id: string;

  // @Prop({
  //   required: true,
  //   type: MongooseSchema.Types.ObjectId,
  //   ref: AccountTeacher.name,
  // })
  // teacher_id: MongooseSchema.Types.ObjectId;

  @Prop({ required: false, type: String })
  teacher_name: string;

  @Prop({ required: false, type: String })
  teacher_nickname: string;

  @Prop({ required: false, type: String })
  team: string;

  @Prop({ required: false, type: String })
  team_leader: string;
  @Prop({ required: false, type: [{ type: TimelineSchema }] })
  timesheet: Timeline[];
}

export const WorkingHoursSchema = SchemaFactory.createForClass(WorkingHours);
