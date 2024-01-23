import { Controller, Get, Body, Post, Put } from '@nestjs/common';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';
import { AccountUserService } from './account-user.service';
import {
  AccountUser,
  AccountUserDocument,
} from './schemas/account-user.schema';
import CreateAccountUserDto from './dto/create-account-user.dto';

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

  @Put('update')
  // @UserAuth([UserRole.admin])
  async updateAccountUser(
    @Body() accountUser: AccountUserDocument,
  ): Promise<void> {
    await this.accountUserService.updateAccountUserById(accountUser);
  }

  @Post('register')
  async createAccountUser(
    @Body() accountUserDto: CreateAccountUserDto,
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
        error,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }
}
