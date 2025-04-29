import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IsAdmin } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    const isAdmin = this.reflector.get(IsAdmin, context.getHandler());
    console.log('isAdmin', isAdmin)
    const { user } = context.switchToHttp().getRequest();
    console.log('user.admin', user.admin)
    return user.admin = isAdmin
  }
}