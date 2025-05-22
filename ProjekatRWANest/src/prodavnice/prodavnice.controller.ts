import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ProdavniceService } from './prodavnice.service';
import { ProdavnicaDto } from './entities/prodavnica.dto';

@Controller()
export class ProdavniceController {

    constructor(private service: ProdavniceService) { }

    @Get('prodavnice')
    public getProdavnice() {
        return this.service.getProdavnice()
    }

    @Get('prodavnica/:id')
    public getProdavnicaByID(@Param('id', ParseIntPipe) prodavnicaID: number) {
        return this.service.getProdavnicaByID(prodavnicaID)
    }

    @Post('prodavnica')
    public addProdavnica(@Body() dto: ProdavnicaDto) {
        return this.service.create(dto)
    }
    
    @Put('prodavnica/:id')
    public updateProdavnica(@Param('id', ParseIntPipe) prodavnicaID: number, @Body() dto: ProdavnicaDto) {
        return this.service.update(prodavnicaID, dto)
    }

    @Delete('prodavnica/:id')
    public deleteProdavnica(@Param('id', ParseIntPipe) prodavnicaID: number) {
        return this.service.delete(prodavnicaID)
    }

}
