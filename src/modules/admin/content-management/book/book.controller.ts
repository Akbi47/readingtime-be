import { Controller, Get, Body, Post, Put, Param } from '@nestjs/common';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';
import { BookService } from './book.service';
import CreateBookDto from './dto/create-book.dto';
import { Book, BookDocument } from './schemas/book.schema';
import { IdDto } from 'src/shares/dtos/param.dto';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get('/')
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
  @Get(':id')
  async getBookById(@Param() idDto: IdDto): Promise<ResponseData<Book>> {
    try {
      const data = await this.bookService.getBookById(idDto);
      return new ResponseData<Book>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<Book>(null, HttpStatus.ERROR, HttpMessage.ERROR);
    }
  }

  @Post('/')
  async createBook(
    @Body() bookDto: CreateBookDto,
  ): Promise<ResponseData<Book>> {
    try {
      const data = await this.bookService.createBook(bookDto);
      return new ResponseData<Book>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<Book>(error, HttpStatus.ERROR, HttpMessage.ERROR);
    }
  }

  @Put()
  async updateBook(@Body() book: BookDocument): Promise<void> {
    await this.bookService.updateBook(book);
  }
}
