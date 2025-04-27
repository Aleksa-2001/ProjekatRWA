import { Injectable } from '@nestjs/common';

@Injectable()
export class ProdavniceService {
    lista = [
        {
            'id': 1,
            'naziv': 'GIGATRON',
            'adresa': 'Delta Planet Niš',
            'opis': '',
            'slika': '',
        },
        {
            'id': 2,
            'naziv': 'Tehnomanija',
            'adresa': 'Forum Shopping centar',
            'opis': '',
            'slika': '',
        }
    ]

    public getProdavnice() {
        return this.lista
    }

    public getProdavnicaByID(prodavnicaID: number) {
        return this.lista.find(prodavnica => prodavnica.id === prodavnicaID)
    }
}
