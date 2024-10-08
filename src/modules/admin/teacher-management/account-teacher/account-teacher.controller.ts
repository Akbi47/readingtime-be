import {
  Controller,
  Get,
  Body,
  Post,
  Put,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';

import { AccountTeacherService } from './account-teacher.service';
import { CreateAccountTeacherDto } from './dto/create-account-teacher.dto';
import {
  AccountTeacher,
  AccountTeacherDocument,
} from './schemas/account-teacher.schema';
import { GetAccountTeacherDto } from './dto/get-account-teacher.dto';
import { JwtAuthGuard } from 'src/modules/authentication/guards/jwt-auth.guard';

@Controller('account-teacher')
export class AccountTeacherController {
  constructor(private readonly accountTeacherService: AccountTeacherService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  // @UserAuth([UserRole.admin])
  async getAccountTeacher(@Query() query: any, @Req() req: any): Promise<any> {
    try {
      let data = await this.accountTeacherService.getAccountTeacher(query);
      data = {
        user: req.user,
        data,
      };
      return new ResponseData<any>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<any>(error, HttpStatus.ERROR, HttpMessage.ERROR);
    }
  }

  @Get('field')
  async getTeacherByInfo(
    @Query() getAccountTeacherDto: GetAccountTeacherDto,
  ): Promise<ResponseData<AccountTeacherDocument>> {
    try {
      const data =
        await this.accountTeacherService.getTeacherByInfo(getAccountTeacherDto);
      return new ResponseData<AccountTeacherDocument>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<AccountTeacherDocument>(
        error,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Get('detail')
  async getAccountTeacher_id(
    @Body() _id: string,
  ): Promise<ResponseData<AccountTeacher>> {
    try {
      const data = await this.accountTeacherService.getAccountTeacherId(_id);
      return new ResponseData<AccountTeacher>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<AccountTeacher>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Put()
  async updateAccountTeacher(
    @Body() accountTeacher: AccountTeacherDocument,
  ): Promise<void> {
    await this.accountTeacherService.updateAccountTeacher(accountTeacher);
  }

  @Post('/')
  async createAccountTeacher(
    @Body() accountTeacherDto: CreateAccountTeacherDto,
  ): Promise<ResponseData<AccountTeacher>> {
    try {
      const data =
        await this.accountTeacherService.createAccountTeacher(
          accountTeacherDto,
        );
      return new ResponseData<AccountTeacher>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<AccountTeacher>(
        error,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }
}
