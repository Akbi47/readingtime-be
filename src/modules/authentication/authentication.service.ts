import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AccountUser } from '../admin/account-user/interface/account-user.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectModel('AccountUser')
    private readonly accountUserModel: Model<AccountUser>,
    private readonly jwtService: JwtService,
  ) {}

  async findOneByUsername(email: string): Promise<AccountUser> {
    return this.accountUserModel.findOne({ Email: email }).exec();
  }

  async generateToken(
    user: AccountUser,
  ): Promise<{ authToken: string; userRole: string }> {
    const payload = {
      Email: user.Email,
      Password: user.Password,
    };

    const role = user.Role;
    const authToken = this.jwtService.sign(payload);

    return { authToken, userRole: role };
  }
}
