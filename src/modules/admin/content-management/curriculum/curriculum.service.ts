import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Curriculum, CurriculumDocument } from './schemas/curriculum.schema';
import CreateCurriculumDto from './dto/create-curriculum.dto';
import { BookService } from '../book/book.service';
import { Book } from '../book/schemas/book.schema';

@Injectable()
export class CurriculumService {
  constructor(
    @InjectModel(Curriculum.name)
    private readonly curriculumModel: Model<Curriculum>,
    @InjectModel(Book.name)
    private readonly bookModel: Model<Book>,
    private readonly bookService: BookService,
  ) {}
  populateBook = [
    {
      path: 'books',
      model: this.bookModel,
    },
  ];
  async getCurriculum(): Promise<Curriculum[]> {
    return this.curriculumModel.find().populate(this.populateBook);
  }

  async getCurriculumById(_id: string): Promise<Curriculum> {
    return this.curriculumModel.findById(_id).exec();
  }

  async createCurriculum(
    CurriculumDto: CreateCurriculumDto,
  ): Promise<Curriculum> {
    const createdCurriculum = new this.curriculumModel(CurriculumDto);
    return createdCurriculum.save();
  }

  async updateCurriculum(curriculum: CurriculumDocument): Promise<void> {
    const { _id, ...updatedData } = curriculum;
    await this.curriculumModel.findOneAndUpdate({ _id }, updatedData, {
      new: true,
    });
  }
}
