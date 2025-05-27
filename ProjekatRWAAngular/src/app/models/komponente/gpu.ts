import { RacunarskaKomponenta } from "../racunarska-komponenta";
import { Prodavnica } from "../prodavnica";

export class GPU extends RacunarskaKomponenta {

    constructor(
        id: number, 
        type: string, 
        tipProizvoda: string, 
        proizvodjac: string, 
        naziv: string, 
        cena: number, 
        opis: string, 
        slika: string, 
        prodavnica: Prodavnica, 
        public frekvencija: number, 
        public VRAM: number
    ) {
        super(id, type, tipProizvoda, proizvodjac, naziv, cena, opis, slika, prodavnica)
        frekvencija = 0
        VRAM = 0
    }
}