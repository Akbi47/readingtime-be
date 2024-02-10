import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { UserRole } from '../enums/account-user.enum';
import { UserRolesGuard } from 'src/modules/authentication/guards/user-roles.guard';
import { UserAtGuards } from 'src/modules/authentication/guards/user-at.guard';

export const Roles = (roles: number[]): MethodDecorator & ClassDecorator => {
  const setMetaData = SetMetadata('roles', roles);
  return setMetaData;
};

export const UserAuth = (
  userRole?: UserRole[],
): MethodDecorator & ClassDecorator => {
  return applyDecorators(
    UseGuards(UserAtGuards, UserRolesGuard),
    Roles(userRole),
  );
};
