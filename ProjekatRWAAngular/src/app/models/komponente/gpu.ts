import { RacunarskaKomponenta } from "../racunarska-komponenta";
import { Prodavnica } from "../prodavnica";

export class GPU extends RacunarskaKomponenta {

    constructor(
        id: number, 
        tip: string, 
        proizvodjac: string, 
        naziv: string, 
        cena: number, 
        opis: string, 
        slika: string, 
        prodavnica: Prodavnica, 
        tipKomponente: string, 
        public frekvencija: number, 
        public VRAM: number
    ) {
        super(id, tip, proizvodjac, naziv, cena, opis, slika, prodavnica, tipKomponente)
        frekvencija = 0
        VRAM = 0
    }
}