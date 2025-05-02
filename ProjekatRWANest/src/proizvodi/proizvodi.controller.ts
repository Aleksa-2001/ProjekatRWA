import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ProizvodiService } from './proizvodi.service';
import { ProdavniceService } from 'src/prodavnice/prodavnice.service';

@Controller()
export class ProizvodiController {

    constructor(private service: ProizvodiService, private prodavniceService: ProdavniceService) { }
    
    @Get('proizvodi')
    getAll() {
        return this.service.getAll()
    }

    @Get('proizvodi/:prodavnicaID')
    public getKomponente(@Param('prodavnicaID', ParseIntPipe) prodavnicaID: number) {
        const prodavnica = this.prodavniceService.getProdavnicaByID(prodavnicaID)
        return this.service.getProizvodi(prodavnica.id)
    }

    @Get('proizvod/:proizvodID')
    public getkomponentaByID(@Param('proizvodID', ParseIntPipe) proizvodID: number) {
        return this.service.getProizvodByID(proizvodID)
    }

}
