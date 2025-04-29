import { Injectable, Scope } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable({ scope: Scope.REQUEST })
export class AuthService {
    
  constructor(private usersService: UsersService, private jwtService: JwtService) { }

  async validateUser(username: string, pass: string): Promise<any> {
    //const saltOrRounds = 10;
    //const hash = await bcrypt.hash(pass, saltOrRounds);
    //console.log(hash);

    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { 
      sub: user.userID,
      admin: user.admin,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username
    };
    return { access_token: this.jwtService.sign(payload) };
  }
}