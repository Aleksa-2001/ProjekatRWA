import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { KomponenteService } from './komponente.service';

@Controller('komponente')
export class KomponenteController {

    constructor(private service: KomponenteService) { }

    @Get()
    public getKomponente() {
        return this.service.getKomponente()
    }

    @Get(':id')
    public getkomponentaByID(@Param('id', ParseIntPipe) komponentaID: number) {
        return this.service.getKomponentaByID(komponentaID)
    }

}
