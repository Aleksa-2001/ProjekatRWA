import { Injectable } from '@nestjs/common';

@Injectable()
export class KomponenteService {
    lista = [
        {
            "id": 1,
            "tip": 2,
            "proizvodjac": "AMD",
            "naziv": "Ryzen 3 3200G",
            "cena": 21000,
            "opis": "AMD Procesor sa integrisanom grafičkom karticom", 
            "slika": "images/ng/komponente/3200g.jpg",
            "prodavnica": null,
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
            "prodavnica": null,
            "tipKomponente": {
                "id": 2,
                "naziv": "Grafička karta"
            },
            "frekvencija": 2.8,
            "VRAM": 16
        }
    ]

    public getKomponente() {
        return this.lista
    }

    public getKomponentaByID(komponentaID: number) {
        return this.lista.find(komponenta => komponenta.id === komponentaID)
    }

}
