import { Injectable } from '@nestjs/common';

@Injectable()
export class ProizvodiService {
    lista = [
        {
            "id": 1,
            "tip": 2,
            "proizvodjac": "AMD",
            "naziv": "Ryzen 3 3200G",
            "cena": 21000,
            "opis": "AMD Procesor sa integrisanom grafičkom karticom", 
            "slika": "images/ng/komponente/3200g.jpg",
            "prodavnica": {
                'id': 1,
                'naziv': 'GIGATRON',
                'adresa': 'Delta Planet Niš',
                'opis': '',
                'slika': '',
            },
            "tipKomponente": {
                "id": 1,
                "naziv": "Procesor"
            },
            "frekvencija": 3.6,
            "brojJezgara": 4,
            "brojNiti": 4
        },
        {
            "id": 2,
            "tip": 2,
            "proizvodjac": "NVIDIA",
            "naziv": "GeForce RTX 4090",
            "cena": 99999,
            "opis": "NVIDIA grafička kartica", 
            "slika": "images/ng/komponente/geforce-rtx-4090.jpg",
            "prodavnica": {
                'id': 2,
                'naziv': 'Tehnomanija',
                'adresa': 'Forum Shopping centar',
                'opis': '',
                'slika': '',
            },
            "tipKomponente": {
                "id": 2,
                "naziv": "Grafička karta"
            },
            "frekvencija": 2.8,
            "VRAM": 16
        }
    ]

    public getAll() {
        return this.lista
    }

    public getProizvodi(prodavnicaID: number) {
        const proizvodi = this.lista.filter(proizvod => proizvod.prodavnica.id == prodavnicaID)
        if (proizvodi.length > 0) return proizvodi
        else return `Prodavnica sa ID-jem ${prodavnicaID} nema unete proizvode`
    }

    public getProizvodByID(proizvodID: number) {
        const proizvod = this.lista.find(proizvod => proizvod.id === proizvodID)
        return proizvod ?? `Komponenta sa ID-jem ${proizvodID} ne postoji u ovoj prodavnici`
    }
    
}
