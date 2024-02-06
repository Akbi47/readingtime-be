import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CurriculumController } from './curriculum.controller';
import { CurriculumService } from './curriculum.service';
import { Curriculum, CurriculumSchema } from './schemas/curriculum.schema';
import { BookModule } from '../book/book.module';
import { Book, BookSchema } from '../book/schemas/book.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Curriculum.name,
        schema: CurriculumSchema,
      },
      {
        name: Book.name,
        schema: BookSchema,
      },
    ]),
    BookModule,
  ],
  controllers: [CurriculumController],
  providers: [CurriculumService],
})
export class CurriculumModule {}
