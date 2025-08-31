import { Injectable, Scope } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CookieOptions, Request } from 'express';
import * as bcrypt from 'bcrypt';

@Injectable({ scope: Scope.REQUEST })
export class AuthService {

    constructor(private userService: UsersService, private jwt: JwtService, private config: ConfigService) { }

    public async login(req: Request) {
        const username = req.body.username
        const user = await this.userService.getUserPayload(username)
        const jwtBearerToken = await this.jwt.signAsync({ sub: user.userID, admin: user.admin })
        return JSON.stringify(jwtBearerToken)
        //const cookieOptions: CookieOptions = {
        //    httpOnly: true,
        //    secure: true
        //}
        //res.cookie('token', jwtBearerToken, cookieOptions)
    }

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userService.getUserByUsername(username)

        if (user && await bcrypt.compare(password, user.password)) {
            const { password, ...result } = user
            return result
        }
        return null
    }

    public async validateToken(req: Request) {
        const token = req.headers.authorization.split(' ')[1]
        const payload = await this.jwt.verifyAsync(token, { secret: this.config.get<string>('JWT_SECRET') })
        return this.userService.getUserByID(payload.sub)
    }
}