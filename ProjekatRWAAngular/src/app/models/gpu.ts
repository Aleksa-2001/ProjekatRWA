import { RacunarskaKomponenta } from "./racunarskaKomponenta";

export class GPU extends RacunarskaKomponenta {

    constructor(id: number, tip: number, proizvodjac: string, naziv: string, cena: number, slika: string, public frekvencija: number, public VRAM: number) {
        super(id, tip, proizvodjac, naziv, cena, slika)
        frekvencija = 0
        VRAM = 0
    }
}