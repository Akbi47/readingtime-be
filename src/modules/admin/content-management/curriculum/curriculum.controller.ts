import { Controller, Get, Body, Post, Put } from '@nestjs/common';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';
import { Curriculum } from './interface/curriculum.interface';
import { CurriculumService } from './curriculum.service';
import { CurriculumDto } from './dto/curriculum.dto';

@Controller('curriculum')
export class CurriculumController {
  constructor(private readonly curriculumService: CurriculumService) {}

  @Get()
  async getCurriculum(): Promise<ResponseData<Curriculum[]>> {
    try {
      const data = await this.curriculumService.getCurriculum();
      return new ResponseData<Curriculum[]>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<Curriculum[]>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Post()
  async createCurriculum(
    @Body() curriculumDto: CurriculumDto,
  ): Promise<ResponseData<Curriculum>> {
    try {
      const data = await this.curriculumService.createCurriculum(curriculumDto);
      return new ResponseData<Curriculum>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<Curriculum>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Get('get-detail')
  async getCurriculumById(@Body() body: { _id: string }): Promise<Curriculum> {
    const { _id } = body;
    return this.curriculumService.getCurriculumById(_id);
  }

  @Put()
  async updateCurriculum(
    @Body() curriculum: Curriculum,
  ): Promise<ResponseData<Curriculum>> {
    try {
      const data = await this.curriculumService.updateCurriculum(curriculum);
      return new ResponseData<Curriculum>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<Curriculum>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }
}
