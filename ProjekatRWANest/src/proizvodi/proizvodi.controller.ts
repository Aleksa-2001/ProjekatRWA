import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ProizvodiService } from './proizvodi.service';
import { ProdavniceService } from 'src/prodavnice/prodavnice.service';

@Controller()
export class ProizvodiController {

    constructor(private service: ProizvodiService, private prodavniceService: ProdavniceService) { }
    
    @Get('proizvodi')
    public getAll() {
        return this.service.getAll()
    }

    @Get('proizvodi/:prodavnicaID')
    public getProizvodi(@Param('prodavnicaID', ParseIntPipe) prodavnicaID: number) {
        return this.service.getProizvodi(prodavnicaID)
    }

    @Get('proizvod/:proizvodID')
    public getProizvodByID(@Param('proizvodID', ParseIntPipe) proizvodID: number) {
        return this.service.getProizvodByID(proizvodID)
    }

}
