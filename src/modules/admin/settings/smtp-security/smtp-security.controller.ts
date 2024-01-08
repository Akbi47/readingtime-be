import { Controller, Get } from '@nestjs/common';
import { SMTPSecurityService } from './smtp-security.service';
import { ResponseData } from 'src/global/globalClass';
import { SMTPSecutiry } from './interface/smtp-security.interface';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';

@Controller('smtp-security')
export class SMTPSecurityController {
  constructor(private readonly smtpSecurityService: SMTPSecurityService) {}

  @Get()
  async getSMTPSecurity(): Promise<ResponseData<SMTPSecutiry[]>> {
    try {
      const data = await this.smtpSecurityService.getSMTPSecurity();
      return new ResponseData<SMTPSecutiry[]>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<SMTPSecutiry[]>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }
}
