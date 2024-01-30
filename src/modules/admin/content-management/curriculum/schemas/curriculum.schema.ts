import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as moment from 'moment';

export type CurriculumDocument = Curriculum & Document;
const formattedDate = moment(Date.now()).format('DD/MM/YYYY');
@Schema({ timestamps: true })
export class Curriculum {
  @Prop({ required: true, type: String })
  curriculum_title: string;

  @Prop({ required: false, type: String })
  subtitle: string;

  @Prop({ required: false, type: String })
  description: string;

  @Prop({ required: false, type: String })
  division: string;

  @Prop({ required: false, type: Boolean })
  whether_to_use: boolean;

  @Prop({ required: false, type: String, default: formattedDate })
  reg_day: string;
}

export const CurriculumSchema = SchemaFactory.createForClass(Curriculum);
