import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { ResponseData } from 'src/global/globalClass';

import { HttpMessage, HttpStatus } from 'src/global/globalEnum';
import { TrialClass, TrialClassDocument } from './schemas/trial-class.schema';
import { CreateTrialClassDto } from './dto/create-trial-class.schema';
import { TrialClassService } from './trial-class.service';

@Controller('trial-class')
export class TrialClassController {
  constructor(private readonly trialClassService: TrialClassService) {}

  // @Post()
  // async createData(@Body() data: any) {
  //   try {
  //     const res = await this.TrialClassService.createData(data);
  //     return res;
  //   } catch (error) {
  //     return error;
  //   }
  // }

  @Get('/')
  async getTrialClass(): Promise<ResponseData<TrialClass[]>> {
    try {
      const data = await this.trialClassService.getTrialClass();
      return new ResponseData<TrialClass[]>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<TrialClass[]>(
        error,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Post('/')
  async createTrialProduct(
    @Body() TrialProductDto: CreateTrialClassDto,
  ): Promise<ResponseData<TrialClass>> {
    try {
      const data =
        await this.trialClassService.createTrialClass(TrialProductDto);
      return new ResponseData<TrialClass>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<TrialClass>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  // @Get('get-detail')
  // async getTrialProductById(
  //   @Body() body: { _id: string },
  // ): Promise<TrialProduct> {
  //   const { _id } = body;
  //   return this.TrialProductService.getTrialProductById(_id);
  // }

  @Put()
  async updateTrialClass(
    @Body() freeTrialProduct: TrialClassDocument,
  ): Promise<void> {
    await this.trialClassService.updateTrialClass(freeTrialProduct);
  }
}
