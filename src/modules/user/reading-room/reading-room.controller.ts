import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { ReadingRoomService } from './reading-room.service';
import { ReadingRoom } from './schemas/reading-room.schema';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';
import { IdDto } from 'src/shares/dtos/param.dto';

@Controller('reading-room')
export class ReadingRoomController {
  constructor(private readonly readingRoomService: ReadingRoomService) {}

  @Get()
  async getReadingRoom(): Promise<ResponseData<ReadingRoom[]>> {
    try {
      const data = await this.readingRoomService.getReadingRoom(null);
      return new ResponseData<ReadingRoom[]>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<ReadingRoom[]>(
        error,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }
  @Get(':id')
  async getReadingRoomById(
    @Param() idDto: IdDto,
  ): Promise<ResponseData<ReadingRoom>> {
    try {
      const data = await this.readingRoomService.getReadingRoomById(idDto);
      return new ResponseData<ReadingRoom>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<ReadingRoom>(
        error,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }
  @Get('user/:id')
  async getReadingRoomOfUser(
    @Param() idDto: IdDto,
  ): Promise<ResponseData<ReadingRoom[]>> {
    try {
      const data = await this.readingRoomService.getReadingRoomOfUser(idDto);
      return new ResponseData<ReadingRoom[]>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<ReadingRoom[]>(
        error,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }
  @Post()
  async createData(@Body() data: any) {
    try {
      const res = await this.readingRoomService.createData(data);
      return res;
    } catch (error) {
      return error;
    }
  }
}
