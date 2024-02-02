import { Controller, Get, Body, Post, Put } from '@nestjs/common';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';
import { FreeTrialProductService } from './free-trial-product.service';
import CreateTrialProductDto from './dto/create-trial-product.dto';
import {
  TrialProduct,
  TrialProductDocument,
} from './schemas/trial-product.schema';
import { GetTrialProductDto } from './dto/get-trial-product.dto';

@Controller('free-trial-product')
export class FreeTrialProductController {
  constructor(
    private readonly freeTrialProductService: FreeTrialProductService,
  ) {}

  @Get('/')
  async getFreeTrialProduct(
    getTrialProductDto: GetTrialProductDto,
  ): Promise<ResponseData<TrialProduct[]>> {
    try {
      const data =
        await this.freeTrialProductService.getFreeTrialProduct(
          getTrialProductDto,
        );
      return new ResponseData<TrialProduct[]>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<TrialProduct[]>(
        error,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Post('/')
  async createFreeTrialProduct(
    @Body() freeTrialProductDto: CreateTrialProductDto,
  ): Promise<ResponseData<TrialProduct>> {
    try {
      const data =
        await this.freeTrialProductService.createFreeTrialProduct(
          freeTrialProductDto,
        );
      return new ResponseData<TrialProduct>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<TrialProduct>(
        error,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Get('get-detail')
  async getFreeTrialProductById(
    @Body() body: { _id: string },
  ): Promise<TrialProduct> {
    const { _id } = body;
    return this.freeTrialProductService.getFreeTrialProductById(_id);
  }

  @Put()
  async updateFreeTrialProduct(
    @Body() freeTrialProduct: TrialProductDocument,
  ): Promise<void> {
    await this.freeTrialProductService.updateFreeTrialProduct(freeTrialProduct);
  }
}
