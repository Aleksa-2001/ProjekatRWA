import { Injectable, Scope, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CookieOptions, Request, Response } from 'express';
import * as bcrypt from 'bcrypt';

@Injectable({ scope: Scope.REQUEST })
export class AuthService {

    constructor(private userService: UsersService, private jwt: JwtService, private config: ConfigService) { }

    async validateUser(username: string, password: string): Promise<any> {
        //const saltOrRounds = 10;
        //const hash = await bcrypt.hash(pass, saltOrRounds);
        //console.log(hash);

        const user = await this.userService.getUserByUsername(username);
        if (user && user.password === password) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    //async login(user: any) {
    //  const payload = { 
    //    sub: user.userID,
    //    admin: user.admin,
    //    firstName: user.firstName,
    //    lastName: user.lastName,
    //    email: user.email,
    //    username: user.username
    //  };
    //  return { access_token: this.jwtService.sign(payload) };
    //}

    public async login(req: Request, res: Response) {
        const username = req.body.username
        const password = req.body.password

        if (this.validateUser(username, password)) {
            const userID = this.userService.getUserID(username)

            const jwtBearerToken = this.jwt.sign({ sub: userID })
            
            //const cookieOptions: CookieOptions = {
            //    httpOnly: true,
            //    secure: true
            //}
            //res.cookie('token', jwtBearerToken, cookieOptions)

            res.status(200).json(jwtBearerToken)
        }
        //else throw new UnauthorizedException('Pogresno korisnicko ime ili lozinka!')
        else res.sendStatus(401)
    }

    public async validateToken(req: Request) {
        const token = req.headers.authorization.split(' ')[1]
        try {
            const payload = await this.jwt.verifyAsync(token, { secret: this.config.get<string>('JWT_SECRET') })
            return this.userService.getUserByID(payload.sub)
        }
        catch {
            return null
        }
    }
}