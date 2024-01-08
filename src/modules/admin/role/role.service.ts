import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role } from './interface/role.interface';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel('Role')
    private readonly roleModel: Model<Role>,
  ) {}

  async getRole(): Promise<Role[]> {
    return this.roleModel.find().exec();
  }
}
