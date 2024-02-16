import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthenticationService } from './authentication.service';
import * as dotenv from 'dotenv';
import { AuthenticationController } from './authentication.controller';
import { AccountUserModule } from '../admin/user-management/account-user/account-user.module';
import { UserAtStrategy } from './strategies/user-at.strategy';
import { UserRtStrategy } from './strategies/user-rt.strategy';
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
  providers: [AuthenticationService, UserAtStrategy, UserRtStrategy],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
