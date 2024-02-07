import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import CreateBookDto from './dto/create-book.dto';
import { httpErrors } from 'src/shares/exceptions';
import { Book, BookDocument } from './schemas/book.schema';
import { IdDto } from 'src/shares/dtos/param.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectModel('Book')
    private bookModel: Model<BookDocument>,
  ) {}

  async getBook(): Promise<Book[]> {
    return this.bookModel.find();
  }

  async getBookById(idDto: IdDto): Promise<Book> {
    return this.bookModel.findById(idDto.id);
  }

  async createBook(createBookDto: CreateBookDto): Promise<Book> {
    const { book_title } = createBookDto;
    const product = await this.bookModel.findOne({ book_title });
    if (product) {
      throw new BadRequestException(httpErrors.PRODUCT_EXISTED);
    }

    const data = await this.bookModel.create(createBookDto);

    return data;
  }

  async updateBook(book: BookDocument): Promise<void> {
    const { _id, ...updatedData } = book;
    await this.bookModel
      .findOneAndUpdate({ _id }, updatedData, {
        new: true,
      })
      .exec();
  }
}
