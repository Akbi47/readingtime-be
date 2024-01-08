import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { AuthenticationService } from './authentication.service';
import { AccountUserModule } from '../admin/account-user/account-user.module';
import { AccountUserSchema } from 'src/schemas/admin/account-user.schema';
import * as dotenv from 'dotenv';
import { AuthenticationController } from './authentication.controller';
dotenv.config();

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'AccountUser', schema: AccountUserSchema },
    ]),
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '8h' },
    }),
    AccountUserModule,
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
