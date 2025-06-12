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
    async login(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
        this.authService.login(req, res)
    }

    @UseGuards(JwtAuthGuard)
    @Get('validate')
    validateToken(@Req() req: Request) {
        return this.authService.validateToken(req)
    }
}
