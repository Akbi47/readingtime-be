import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { CourseRegistration } from '../../course-registration/schemas/course-registration.schema';
import { RegularProduct } from 'src/modules/admin/product-management/regular-product/schemas/regular-product.schema';

export type RegularCourseRegistrationDocument = RegularCourseRegistration &
  Document;

@Schema({ timestamps: true })
export class RegularCourseRegistration extends CourseRegistration {
  @Prop({
    required: false,
    type: MongooseSchema.Types.ObjectId,
    ref: RegularProduct.name,
  })
  regular_product_id: MongooseSchema.Types.ObjectId;
}

export const RegularCourseRegistrationSchema = SchemaFactory.createForClass(
  RegularCourseRegistration,
);
