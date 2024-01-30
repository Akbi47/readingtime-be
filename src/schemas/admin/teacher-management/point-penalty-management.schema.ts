import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { AccountTeacher } from 'src/modules/admin/teacher-management/account-teacher/schemas/account-teacher.schema';


export type PointPenaltyManagementDocument = PointPenaltyManagement & Document;

@Schema({ timestamps: true })
export class PointPenaltyManagement {
  @Prop({
    required: true,
    type: MongooseSchema.Types.ObjectId,

    ref: AccountTeacher.name,
  })
  teacher_id: MongooseSchema.Types.ObjectId;

  @Prop({ required: true, type: String })
  division: string;

  @Prop({ required: true, type: String })
  items: string;

  @Prop({ required: false, type: String })
  texts?: string;
}

export const PointPenaltyManagementSchema = SchemaFactory.createForClass(
  PointPenaltyManagement,
);
