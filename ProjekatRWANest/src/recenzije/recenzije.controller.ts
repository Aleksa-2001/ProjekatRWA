import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { RecenzijeService } from './recenzije.service';
import { RecenzijaDto } from 'src/dto/recenzija.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller()
@UseGuards(JwtAuthGuard)
export class RecenzijeController {

    constructor(private service: RecenzijeService) { }

    @Get('recenzije')
    public getAll() {
        return this.service.getAll()
    }

    @Get('recenzijeProdavnice/:id')
    public getRecenzijeByProdavnicaID(@Param('id', ParseIntPipe) prodavnicaID: number) {
        return this.service.getRecenzijeByProdavnicaID(prodavnicaID)
    }

    @Get('recenzijeProizvoda/:id')
    public getRecenzijeByProizvodID(@Param('id', ParseIntPipe) proizvodID: number) {
        return this.service.getRecenzijeByProizvodID(proizvodID)
    }

    @Get('recenzija/:id')
    public getRecenzijaByID(@Param('id', ParseIntPipe) recenzijaID: number) {
        return this.service.getRecenzijaByID(recenzijaID)
    }

    @Post('recenzija')
    public addRecenzija(@Body() dto: RecenzijaDto) {
        return this.service.create(dto)
    }

    @Put('recenzija/:id')
    public updateRecenzija(@Param('id', ParseIntPipe) recenzijaID: number, @Body() dto: RecenzijaDto) {
        return this.service.update(recenzijaID, dto)
    }

    @Delete('recenzija/:id')
    public deleteRecenzija(@Param('id', ParseIntPipe) recenzijaID: number) {
        return this.service.delete(recenzijaID)
    }
    
}
