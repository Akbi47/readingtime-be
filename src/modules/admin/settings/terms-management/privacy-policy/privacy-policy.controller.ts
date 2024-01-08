import { Controller, Get, Put, Body } from '@nestjs/common';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';
import { PrivacyPolicy } from './interface/privacy-policy.interface';
import { PrivacyPolicyService } from './privacy-policy.service';

@Controller('privacy-policy')
export class PrivacyPolicyController {
  constructor(private readonly privacyPolicyService: PrivacyPolicyService) {}

  @Get()
  async getPrivacyPolicy(): Promise<ResponseData<PrivacyPolicy[]>> {
    try {
      const data = await this.privacyPolicyService.getPrivacyPolicy();
      return new ResponseData<PrivacyPolicy[]>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<PrivacyPolicy[]>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Put()
  async updatePrivacyPolicy(
    @Body() PrivacyPolicy: PrivacyPolicy,
  ): Promise<ResponseData<PrivacyPolicy>> {
    try {
      const data =
        await this.privacyPolicyService.updatePrivacyPolicy(PrivacyPolicy);
      return new ResponseData<PrivacyPolicy>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<PrivacyPolicy>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }
}
