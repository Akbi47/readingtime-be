import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthenticationService } from './authentication.service';
import * as dotenv from 'dotenv';
import { AuthenticationController } from './authentication.controller';
import { AccountUserModule } from '../admin/user-management/account-user/account-user.module';
dotenv.config();

@Module({
  imports: [
    AccountUserModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '8h' },
    }),
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
