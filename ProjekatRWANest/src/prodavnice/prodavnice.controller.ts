import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ProdavniceService } from './prodavnice.service';

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

}
