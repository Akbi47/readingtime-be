import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { ResponseLogin } from './dto/response-login.dto';
import { httpErrors } from 'src/shares/exceptions';
import { validateHash } from 'src/shares/helpers/bcrypt';
import { AccountUser } from '../admin/user-management/account-user/schemas/account-user.schema';
import { AccountUserService } from '../admin/user-management/account-user/account-user.service';
import { UserStatus } from 'src/shares/enums/account-user.enum';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthenticationService {
  constructor(
    private accountUserService: AccountUserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  async login(loginDto: LoginDto): Promise<ResponseLogin> {
    const { email, password } = loginDto;
    const user = await this.accountUserService.findOne({
      email,
      status: UserStatus.ACTIVE,
    });

    if (!user) {
      throw new BadRequestException(httpErrors.ACCOUNT_NOT_FOUND);
    }

    if (!(await validateHash(password, user.password))) {
      throw new UnauthorizedException(httpErrors.UNAUTHORIZED);
    }

    const [accessToken, refreshToken] = await Promise.all([
      this.generateToken(user),
      this.generateRefreshToken(user),
    ]);

    await Promise.all([
      this.accountUserService.updateRecentLogin(user._id),
      this.accountUserService.update(
        { _id: user._id },
        {
          refresh_token: refreshToken,
        },
      ),
    ]);

    return {
      accessToken,
      exp: this.configService.get<number>('EXPIRESIN'),
      refreshToken,
      expRefresh: this.configService.get<number>('EXPIRESIN_REFRESH'),
    };
  }

  async decodeAccessToken(accessToken: string): Promise<any> {
    return this.jwtService.decode(accessToken);
  }

  private async generateToken(user: AccountUser): Promise<any> {
    const payload = {
      email: user.email,
      role: user.role,
      sub: user['_id'],
    };
    const authToken = this.jwtService.sign(payload);

    return authToken;
  }
  private async generateRefreshToken(user: AccountUser): Promise<any> {
    const payload = {
      email: user.email,
      role: user.role,
      sub: user['_id'],
    };
    const authToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('SECRET_KEY'),
      expiresIn: this.configService.get<number>('EXPIRESIN_REFRESH'),
    });

    return authToken;
  }
  async refresh(token: string): Promise<any> {
    const isValidUser = await this.jwtService.verify(token, {
      secret: this.configService.get<string>('SECRET_KEY'),
    });
    if (!isValidUser) {
      throw new BadRequestException(httpErrors.ACCOUNT_HASH_NOT_MATCH);
    }
    const user = await this.accountUserService.getUserByRefresh(
      token,
      isValidUser.email,
    );
    const accessToken = await this.generateToken(user);
    const payload = {
      email: user.email,
      role: user.role,
      sub: user['_id'],
    };
    return {
      ...payload,
      accessToken,
    };
  }
  async logout(user: any) {
    await this.accountUserService.update(
      { _id: user.userId },
      { refresh_token: null },
    );
  }
}
