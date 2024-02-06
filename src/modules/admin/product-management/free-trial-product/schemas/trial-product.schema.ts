import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Curriculum } from 'src/modules/admin/content-management/curriculum/schemas/curriculum.schema';

export type TrialProductDocument = TrialProduct & Document;

@Schema({ timestamps: true })
export class TrialProduct {
  @Prop({ required: true, type: String })
  product_name: string;

  @Prop({ required: false, type: String })
  description: string;

  @Prop({ required: false, type: String })
  picture: string;

  @Prop({
    required: false,
    type: MongooseSchema.Types.ObjectId,
    ref: Curriculum.name,
  })
  curriculum: MongooseSchema.Types.ObjectId;

  @Prop({ required: false, type: String })
  country_of_sale: string;

  @Prop({ required: false, type: String })
  currency: string;

  @Prop({ required: false, type: String })
  about: string;

  @Prop({ required: false, type: String })
  reg_day: string;

  @Prop({ required: false, type: String })
  exp_day: string;

  @Prop({ required: false, type: Number })
  class_day_per_week: number;

  @Prop({ required: false, type: Number })
  class_day_total: number;

  @Prop({ required: false, type: String })
  whether_to_use: string;

  @Prop({ required: false, type: [String] })
  study_time: string[];
}

export const TrialProductSchema = SchemaFactory.createForClass(TrialProduct);
