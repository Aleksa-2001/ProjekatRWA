import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ProizvodiService } from './proizvodi.service';

@Controller()
export class ProizvodiController {

    constructor(private service: ProizvodiService) { }
    
    @Get()
    getAll() {
        return this.service.getAll()
    }

    @Get('proizvodi/:prodavnicaID')
    public getKomponente(@Param('prodavnicaID', ParseIntPipe) prodavnicaID: number) {
        return this.service.getProizvodi(prodavnicaID)
    }

    @Get('proizvod/:proizvodID')
    public getkomponentaByID(@Param('proizvodID', ParseIntPipe) proizvodID: number) {
        return this.service.getProizvodByID(proizvodID)
    }

}
