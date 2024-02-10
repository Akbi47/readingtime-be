import { Injectable, UnauthorizedException } from '@nestjs/common';

import express from 'express';
import { AccountUserService } from 'src/modules/admin/user-management/account-user/account-user.service';

import { httpErrors } from 'src/shares/exceptions';
import { AuthenticationService } from '../authentication.service';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserStatus } from 'src/shares/enums/account-user.enum';

@Injectable()
export class UserAtStrategy extends PassportStrategy(Strategy, 'user-jwt') {
  constructor(
    private readonly userService: AccountUserService,
    private readonly authService: AuthenticationService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET_KEY,
      passReqToCallback: true,
    });
  }

  async validate(req: express.Request, payload: any): Promise<any> {
    const accessToken = req.headers['authorization']?.split(' ')[1] || '';
    const authenticatedUser =
      await this.authService.decodeAccessToken(accessToken);
    if (!authenticatedUser) {
      throw new UnauthorizedException('UNAUTHORIZED');
    }

    const user = await this.userService.findById(payload.userId);

    if (!user) {
      throw new UnauthorizedException();
    }

    if (user.status === UserStatus.INACTIVE) {
      throw new UnauthorizedException(httpErrors.USER_BANNED);
    }

    // if (!user.is_verify) {
    //   throw new UnauthorizedException(httpErrors.USER_UNVERIFIED);
    // }

    return user;
  }
}
