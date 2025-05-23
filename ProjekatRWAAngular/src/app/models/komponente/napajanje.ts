import { RacunarskaKomponenta } from "../racunarska-komponenta";
import { Prodavnica } from "../prodavnica";

export class Napajanje extends RacunarskaKomponenta {

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
        public snaga: number, 
        public modularno: boolean
    ) {
        super(id, tip, proizvodjac, naziv, cena, opis, slika, prodavnica, tipKomponente)
        snaga = 0
        modularno = false
    }
}