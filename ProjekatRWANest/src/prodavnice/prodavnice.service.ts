import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class ProdavniceService {
    lista = [
        {
            'id': 1,
            'naziv': 'GIGATRON',
            'adresa': 'Delta Planet Niš',
            'opis': '',
            'slika': 'images/ng/prodavnice/gigatron-delta-nis.jpg',
        },
        {
            'id': 2,
            'naziv': 'Tehnomanija',
            'adresa': 'Nikole Pašića 28a Niš',
            'opis': '',
            'slika': 'images/ng/prodavnice/tehnomanija-nikole-pasica-nis.jpg',
        }
    ]

    public getProdavnice() {
        return this.lista
    }

    public getProdavnicaByID(prodavnicaID: number) {
        const prodavnica = this.lista.find(prodavnica => prodavnica.id === prodavnicaID)
        if (prodavnica) return prodavnica 
        else throw new HttpException(`Prodavnica sa ID-jem ${prodavnicaID} ne postoji!`, HttpStatus.NOT_FOUND)
    }
}
