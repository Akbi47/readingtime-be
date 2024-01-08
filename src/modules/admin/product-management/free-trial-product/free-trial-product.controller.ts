import { Controller, Get, Body, Post, Put } from '@nestjs/common';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';
import { FreeTrialProduct } from './interface/free-trial-product.interface';
import { FreeTrialProductService } from './free-trial-product.service';
import { FreeTrialProductDto } from './dto/free-trial-product.dto';

@Controller('free-trial-product')
export class FreeTrialProductController {
  constructor(
    private readonly freeTrialProductService: FreeTrialProductService,
  ) {}

  @Get()
  async getFreeTrialProduct(): Promise<ResponseData<FreeTrialProduct[]>> {
    try {
      const data = await this.freeTrialProductService.getFreeTrialProduct();
      return new ResponseData<FreeTrialProduct[]>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<FreeTrialProduct[]>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Post()
  async createFreeTrialProduct(
    @Body() freeTrialProductDto: FreeTrialProductDto,
  ): Promise<ResponseData<FreeTrialProduct>> {
    try {
      const data =
        await this.freeTrialProductService.createFreeTrialProduct(
          freeTrialProductDto,
        );
      return new ResponseData<FreeTrialProduct>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<FreeTrialProduct>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Get('get-detail')
  async getFreeTrialProductById(
    @Body() body: { _id: string },
  ): Promise<FreeTrialProduct> {
    const { _id } = body;
    return this.freeTrialProductService.getFreeTrialProductById(_id);
  }

  @Put()
  async updateFreeTrialProduct(
    @Body() freeTrialProduct: FreeTrialProduct,
  ): Promise<ResponseData<FreeTrialProduct>> {
    try {
      const data =
        await this.freeTrialProductService.updateFreeTrialProduct(
          freeTrialProduct,
        );
      return new ResponseData<FreeTrialProduct>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<FreeTrialProduct>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }
}
