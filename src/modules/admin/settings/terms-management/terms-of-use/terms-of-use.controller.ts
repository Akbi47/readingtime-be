import { Controller, Get, Put, Body } from '@nestjs/common';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';
import { TermsOfUse } from './interface/terms-of-use.interface';
import { TermsOfUseService } from './terms-of-use.service';

@Controller('terms-of-use')
export class TermsOfUseController {
  constructor(private readonly termsOfUseService: TermsOfUseService) {}

  @Get()
  async getTermsOfUse(): Promise<ResponseData<TermsOfUse[]>> {
    try {
      const data = await this.termsOfUseService.getTermsOfUse();
      return new ResponseData<TermsOfUse[]>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<TermsOfUse[]>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Put()
  async updateTermsOfUse(
    @Body() termsOfUse: TermsOfUse,
  ): Promise<ResponseData<TermsOfUse>> {
    try {
      const data = await this.termsOfUseService.updateTermsOfUse(termsOfUse);
      return new ResponseData<TermsOfUse>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<TermsOfUse>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }
}
