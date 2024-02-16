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

@Injectable()
export class AuthenticationService {
  constructor(
    private accountUserService: AccountUserService,
    private readonly jwtService: JwtService,
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

    await this.accountUserService.updateRecentLogin(user._id);
    const { authToken, userRole } = await this.generateToken(user);

    return {
      accessToken: authToken,
      role: userRole,
      _id: user._id,
    };
  }

  async decodeAccessToken(accessToken: string): Promise<any> {
    return this.jwtService.decode(accessToken);
  }

  async generateToken(
    user: AccountUser,
  ): Promise<{ authToken: string; userRole: number }> {
    const { role } = user;
    const payload = {
      email: user.email,
      role: user.role,
      userId: user['_id'],
    };
    const authToken = this.jwtService.sign(payload);

    return { authToken, userRole: role };
  }
}
