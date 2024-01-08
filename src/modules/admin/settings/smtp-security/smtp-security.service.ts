import { SMTPSecutiry } from './interface/smtp-security.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class SMTPSecurityService {
  constructor(
    @InjectModel('SMTPSecurity')
    private readonly smtpSecurityModel: Model<SMTPSecutiry>,
  ) {}

  async getSMTPSecurity(): Promise<SMTPSecutiry[]> {
    return this.smtpSecurityModel.find().exec();
  }
}
