import { Controller, Get, Body, Post, Put } from '@nestjs/common';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';
import { BoardNoticeFAQ } from './interface/board-notice-faq.interface';
import { BoardNoticeFAQService } from './board-notice-faq.service';
import { BoardNoticeFAQDto } from './dto/board-notice-faq.dto';

@Controller('board-notice-faq')
export class BoardNoticeFAQNoticeFAQController {
  constructor(private readonly boardNoticeFAQService: BoardNoticeFAQService) {}

  @Get()
  async getBoardNoticeFAQ(): Promise<ResponseData<BoardNoticeFAQ[]>> {
    try {
      const data = await this.boardNoticeFAQService.getBoardNoticeFAQ();
      return new ResponseData<BoardNoticeFAQ[]>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<BoardNoticeFAQ[]>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Post()
  async createBook(
    @Body() boardNoticeFAQDto: BoardNoticeFAQDto,
  ): Promise<ResponseData<BoardNoticeFAQ>> {
    try {
      const data =
        await this.boardNoticeFAQService.createBoardNoticeFAQ(
          boardNoticeFAQDto,
        );
      return new ResponseData<BoardNoticeFAQ>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<BoardNoticeFAQ>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Get('get-detail')
  async getBoardNoticeFAQById(
    @Body() body: { _id: string },
  ): Promise<BoardNoticeFAQ> {
    const { _id } = body;
    return this.boardNoticeFAQService.getBoardNoticeFAQById(_id);
  }

  @Put()
  async updateBoardNoticeFAQ(
    @Body() boardNoticeFAQ: BoardNoticeFAQ,
  ): Promise<ResponseData<BoardNoticeFAQ>> {
    try {
      const data =
        await this.boardNoticeFAQService.updateBoardNoticeFAQ(boardNoticeFAQ);
      return new ResponseData<BoardNoticeFAQ>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<BoardNoticeFAQ>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }
}
