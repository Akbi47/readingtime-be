import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as moment from 'moment';

export type BookDocument = Book & Document;
const formattedDate = moment(Date.now()).format('DD/MM/YYYY');
@Schema({ timestamps: true })
export class Book {
  @Prop({ required: true, type: String })
  book_title: string;

  @Prop({ required: false, type: String })
  subtitle: string;

  @Prop({ required: false, type: String })
  description: string;

  @Prop({ required: false, type: String })
  summary: string;

  @Prop({ required: false, type: String })
  class_goal: string;

  @Prop({ required: false, type: String })
  genre: string;

  @Prop({ required: false, type: String })
  level: string;

  @Prop({ required: false, type: Number })
  page: number;

  @Prop({ required: false, type: Number })
  vocab: number;

  @Prop({ required: false, type: String })
  grade: string;

  @Prop({ required: false, type: String })
  lexile: string;

  @Prop({ required: false, type: String })
  cover_image: string;

  @Prop({ required: false, type: String })
  attachments: string;

  @Prop({ required: false, type: Boolean })
  whether_to_use: boolean;

  @Prop({ required: false, type: String, default: formattedDate })
  reg_day: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
