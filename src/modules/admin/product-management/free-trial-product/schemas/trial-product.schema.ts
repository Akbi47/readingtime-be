import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TrialProductDocument = TrialProduct & Document;

@Schema({ timestamps: true })
export class TrialProduct {
  @Prop({ required: true, type: String })
  product_name: string;

  @Prop({ required: false, type: String })
  description: string;

  @Prop({ required: false, type: String })
  picture: string;

  @Prop({ required: false, type: String })
  curriculum: string;

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
}

export const TrialProductSchema = SchemaFactory.createForClass(TrialProduct);
