import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ProdavniceService } from './prodavnice.service';

@Controller('prodavnice')
export class ProdavniceController {

    constructor(private service: ProdavniceService) { }

    @Get()
    public getProdavnice() {
        return this.service.getProdavnice()
    }

    @Get(':id')
    public getProdavnicaByID(@Param('id', ParseIntPipe) prodavnicaID: number) {
        return this.service.getProdavnicaByID(prodavnicaID)
    }

}
