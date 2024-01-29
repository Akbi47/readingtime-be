import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AccountTeacher } from '../../account-teacher/schemas/account-teacher.schema';

export type WorkingHoursDocument = WorkingHours & Document;

@Schema({ timestamps: true })
export class WorkingHours {
  @Prop({
    required: true,
    type: String,
    index: true,
    ref: AccountTeacher.name,
  })
  teacher_id: string;

  @Prop({ required: false, type: String })
  teacher_name: string;

  @Prop({ required: false, type: String })
  teacher_nickname: string;

  @Prop({ required: false, type: String })
  team: string;

  @Prop({ required: false, type: String })
  team_leader: string;

  @Prop({
    required: false,
    type: [
      {
        time: String,
        mon: Boolean,
        tue: Boolean,
        wed: Boolean,
        thu: Boolean,
        fri: Boolean,
        sat: Boolean,
        sun: Boolean,
      },
    ],
  })
  timesheet: any[];
}

export const WorkingHoursSchema = SchemaFactory.createForClass(WorkingHours);
