import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CouponDocument = Coupon & Document;
@Schema({ timestamps: true })
export class Coupon {
  @Prop({ required: false, type: String })
  type: string;
  @Prop({ required: false, type: String })
  target: string;
  @Prop({ required: false, type: String })
  cycle: string;
  @Prop({ required: false, type: String })
  name: string;
  @Prop({ required: false, type: String })
  desc: string;
  @Prop({ required: false, type: String })
  discount_rate: string;
  @Prop({ required: false, type: String })
  nick_name: string;
  @Prop({ required: false, type: String })
  exp_period: string;
  @Prop({ required: false, type: String })
  issue_date: string;
  @Prop({ required: false, type: String })
  mode: string;
  @Prop({ required: false, type: String })
  start_date: string;
}

export const CouponSchema = SchemaFactory.createForClass(Coupon);
