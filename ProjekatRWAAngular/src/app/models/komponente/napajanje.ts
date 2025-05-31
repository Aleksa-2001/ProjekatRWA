import { RacunarskaKomponenta } from "../racunarska-komponenta";
import { Prodavnica } from "../prodavnica";

export class Napajanje extends RacunarskaKomponenta {

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
        public snaga: number, 
        public modularno: boolean
    ) {
        super(id, type, tipProizvoda, proizvodjac, naziv, cena, opis, slika, prodavnica)
        snaga = 0
        modularno = false
    }
}