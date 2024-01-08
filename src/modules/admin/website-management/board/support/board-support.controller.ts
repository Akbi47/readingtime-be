import { Controller, Get, Body, Post, Put } from '@nestjs/common';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';
import { BoardSupport } from './interface/board-support.interface';
import { BoardSupportService } from './board-support.service';
import { BoardSupportDto } from './dto/board-support.dto';

@Controller('board-support')
export class BoardSupportSupportController {
  constructor(private readonly boardSupportService: BoardSupportService) {}

  @Get()
  async getBoardSupport(): Promise<ResponseData<BoardSupport[]>> {
    try {
      const data = await this.boardSupportService.getBoardSupport();
      return new ResponseData<BoardSupport[]>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<BoardSupport[]>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Post()
  async createBook(
    @Body() boardSupportDto: BoardSupportDto,
  ): Promise<ResponseData<BoardSupport>> {
    try {
      const data =
        await this.boardSupportService.createBoardSupport(boardSupportDto);
      return new ResponseData<BoardSupport>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<BoardSupport>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Get('get-detail')
  async getBoardSupportById(
    @Body() body: { _id: string },
  ): Promise<BoardSupport> {
    const { _id } = body;
    return this.boardSupportService.getBoardSupportById(_id);
  }

  @Put()
  async updateBoardSupport(
    @Body() boardSupport: BoardSupport,
  ): Promise<ResponseData<BoardSupport>> {
    try {
      const data =
        await this.boardSupportService.updateBoardSupport(boardSupport);
      return new ResponseData<BoardSupport>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<BoardSupport>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }
}
