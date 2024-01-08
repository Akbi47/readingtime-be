import { Controller, Get, Body, Post, Put } from '@nestjs/common';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';
import { Book } from './interface/book.interface';
import { BookService } from './book.service';
import { BookDto } from './dto/book.dto';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  async getBook(): Promise<ResponseData<Book[]>> {
    try {
      const data = await this.bookService.getBook();
      return new ResponseData<Book[]>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<Book[]>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Post()
  async createBook(@Body() bookDto: BookDto): Promise<ResponseData<Book>> {
    try {
      const data = await this.bookService.createBook(bookDto);
      return new ResponseData<Book>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<Book>(null, HttpStatus.ERROR, HttpMessage.ERROR);
    }
  }

  @Get('get-detail')
  async getBookById(@Body() body: { _id: string }): Promise<Book> {
    const { _id } = body;
    return this.bookService.getBookById(_id);
  }

  @Put()
  async updateBook(@Body() book: Book): Promise<ResponseData<Book>> {
    try {
      const data = await this.bookService.updateBook(book);
      return new ResponseData<Book>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<Book>(null, HttpStatus.ERROR, HttpMessage.ERROR);
    }
  }
}
