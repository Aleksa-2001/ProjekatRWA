import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from '../dto/user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller()
export class UsersController {

    constructor(private service: UsersService) { }

    //@Get('users')
    //public getUsers() {
    //    return this.service.getUsers()
    //}
    
    @UseGuards(JwtAuthGuard)
    @Get('user/:id')
    public getUserByID(@Param('id', ParseIntPipe) userID: number) {
        return this.service.getUserByID(userID)
    }
    
    //@Post('user')
    //public addUser(@Body() dto: UserDto) {
    //    return this.service.addUser(dto)
    //}
    //
    //@Put('user/:id')
    //public updateUser(@Param('id', ParseIntPipe) userID: number, @Body() dto: UserDto) {
    //    return this.service.updateUser(userID, dto)
    //}
    //
    //@Delete('user/:id')
    //public deleteUser(@Param('id', ParseIntPipe) userID: number) {
    //    return this.service.deleteUser(userID)
    //}

}
