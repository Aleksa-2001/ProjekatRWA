import { Controller, Get, Post, UseGuards, Req, Res } from '@nestjs/common';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { AuthService } from '../auth/auth.service';
import { Request, Response } from 'express';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }
    
    @UseGuards(LocalAuthGuard)
    @Post('login')
    public login(@Req() req: Request) {
        return this.authService.login(req)
    }

    @UseGuards(JwtAuthGuard)
    @Get('validate')
    public validateToken(@Req() req: Request) {
        return this.authService.validateToken(req)
    }
}
