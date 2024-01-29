import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { LeaveInfo } from 'src/shares/enums/account-teacher.enum';
import * as moment from 'moment';
import { AccountTeacher } from '../../account-teacher/schemas/account-teacher.schema';

export type VacationResignationManagementDocument =
  VacationResignationManagement & Document;

const formattedDate = moment(Date.now()).format('DD/MM/YYYY');

@Schema({ timestamps: true })
export class VacationResignationManagement {
  @Prop({
    required: true,
    type: String,
    index: true,
    ref: AccountTeacher.name,
  })
  teacher_id: string;

  @Prop({ required: false, type: String, default: formattedDate })
  submit_date: string;

  @Prop({ required: false, type: String })
  name: string;

  @Prop({ required: false, type: String })
  paper_no: string;

  @Prop({ required: false, type: String, enum: LeaveInfo })
  part: LeaveInfo;

  @Prop({ required: false, type: String })
  team_leader_name: string;

  @Prop({ required: false, type: String })
  director_name: string;

  @Prop({ required: false, type: Number })
  day: number;

  @Prop({ required: false, type: String })
  period: string;

  @Prop({ required: false, type: String })
  reason: string;

  @Prop({ required: false, type: String })
  details: string;

  @Prop({ required: false, type: String })
  letter: string;
}

export const VacationResignationManagementSchema = SchemaFactory.createForClass(
  VacationResignationManagement,
);
