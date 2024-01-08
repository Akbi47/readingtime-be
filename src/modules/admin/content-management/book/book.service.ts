import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from './interface/book.interface';
import { BookDto } from './dto/book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectModel('Book')
    private readonly bookModel: Model<Book>,
  ) {}

  async getBook(): Promise<Book[]> {
    return this.bookModel.find().exec();
  }

  async getBookById(_id: string): Promise<Book> {
    return this.bookModel.findById(_id).exec();
  }

  async createBook(bookDto: BookDto): Promise<Book> {
    const createdBook = new this.bookModel(bookDto);
    return createdBook.save();
  }

  async updateBook(book: Book): Promise<Book> {
    const { _id, ...updatedData } = book;
    return this.bookModel
      .findOneAndUpdate({ _id }, updatedData, {
        new: true,
      })
      .exec();
  }
}
