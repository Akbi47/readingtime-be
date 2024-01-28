import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { TrialProduct } from '../../free-trial-product/schemas/trial-product.schema';

export type RegularProductDocument = RegularProduct & Document;

@Schema({ timestamps: true })
export class RegularProduct extends TrialProduct {
  @Prop({ required: false, type: String })
  price: string;

  @Prop({ required: false, type: String })
  discount_price: string;

  @Prop({ required: false, type: String })
  study_time: string;

  @Prop({ required: false, type: String })
  product_division: string;
}

export const RegularProductSchema =
  SchemaFactory.createForClass(RegularProduct);
