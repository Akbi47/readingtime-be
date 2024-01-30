import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CurriculumController } from './curriculum.controller';
import { CurriculumService } from './curriculum.service';
import { Curriculum, CurriculumSchema } from './schemas/curriculum.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Curriculum.name,
        schema: CurriculumSchema,
      },
    ]),
  ],
  controllers: [CurriculumController],
  providers: [CurriculumService],
})
export class CurriculumModule {}
