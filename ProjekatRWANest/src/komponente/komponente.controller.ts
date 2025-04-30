import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { KomponenteService } from './komponente.service';

@Controller('komponente')
export class KomponenteController {

    constructor(private service: KomponenteService) { }

    @Get()
    getAll() {
        return this.service.getAll()
    }

    @Get(':prodavnicaID')
    public getKomponente(@Param('prodavnicaID', ParseIntPipe) prodavnicaID: number) {
        return this.service.getKomponente(prodavnicaID)
    }

    @Get(':prodavnicaID/:komponentaID')
    public getkomponentaByID(@Param('prodavnicaID', ParseIntPipe) prodavnicaID: number, @Param('komponentaID', ParseIntPipe) komponentaID: number) {
        return this.service.getKomponentaByID(prodavnicaID, komponentaID)
    }

}
