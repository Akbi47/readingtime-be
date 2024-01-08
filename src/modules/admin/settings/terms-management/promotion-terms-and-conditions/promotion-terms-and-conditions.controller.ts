import { Controller, Get, Put, Body } from '@nestjs/common';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';
import { PromotionTermsAndConditions } from './interface/promotion-terms-and-conditions.interface';
import { PromotionTermsAndConditionsService } from './promotion-terms-and-conditions.service';

@Controller('promotion-terms-and-conditions')
export class PromotionTermsAndConditionsController {
  constructor(
    private readonly promotionTermsAndConditionsService: PromotionTermsAndConditionsService,
  ) {}

  @Get()
  async getPromotionTermsAndConditions(): Promise<
    ResponseData<PromotionTermsAndConditions[]>
  > {
    try {
      const data =
        await this.promotionTermsAndConditionsService.getPromotionTermsAndConditions();
      return new ResponseData<PromotionTermsAndConditions[]>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<PromotionTermsAndConditions[]>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Put()
  async updatePromotionTermsAndConditions(
    @Body() promotionTermsAndConditions: PromotionTermsAndConditions,
  ): Promise<ResponseData<PromotionTermsAndConditions>> {
    try {
      const data =
        await this.promotionTermsAndConditionsService.updatePromotionTermsAndConditions(
          promotionTermsAndConditions,
        );
      return new ResponseData<PromotionTermsAndConditions>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<PromotionTermsAndConditions>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }
}
