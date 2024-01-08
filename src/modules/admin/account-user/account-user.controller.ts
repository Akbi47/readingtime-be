import { Controller, Get, Put, Body, Post } from '@nestjs/common';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';
import { AccountUser } from './interface/account-user.interface';
import { AccountUserService } from './account-user.service';
import { AccountUserDto } from './dto/account-user.dto';

@Controller('account-user')
export class AccountUserController {
  constructor(private readonly accountUserService: AccountUserService) {}

  @Get()
  async getAccountUser(): Promise<ResponseData<AccountUser[]>> {
    try {
      const data = await this.accountUserService.getAccountUser();
      return new ResponseData<AccountUser[]>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<AccountUser[]>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Get('detail')
  async getAccountUser_Id(
    @Body() _id: string,
  ): Promise<ResponseData<AccountUser>> {
    try {
      const data = await this.accountUserService.getAccountUserId(_id);
      return new ResponseData<AccountUser>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<AccountUser>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Put()
  async updateAccountUser(
    @Body() accountUser: AccountUser,
  ): Promise<ResponseData<AccountUser>> {
    try {
      const data = await this.accountUserService.updateAccountUser(accountUser);
      return new ResponseData<AccountUser>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<AccountUser>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Post()
  async createAccountUser(
    @Body() accountUserDto: AccountUserDto,
  ): Promise<ResponseData<AccountUser>> {
    try {
      const data =
        await this.accountUserService.createAccountUser(accountUserDto);
      return new ResponseData<AccountUser>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<AccountUser>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }
}
