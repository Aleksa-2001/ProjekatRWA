import { Controller, Get, Post, UseGuards, Req, Res } from '@nestjs/common';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { AuthService } from '../auth/auth.service';
import { Request, Response } from 'express';

@Controller()
export class AuthController {
    constructor(private authService: AuthService) { }
    
    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
        this.authService.login(req, res)
    }
}
