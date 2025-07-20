import { RacunarskaKomponenta } from "../racunarska-komponenta";
import { Prodavnica } from "../prodavnica";

export class Kuciste extends RacunarskaKomponenta {

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
        public tipKucista: string,
        public duzina: number,
        public sirina: number,
        public visina: number
    ) {
        super(id, type, tipProizvoda, proizvodjac, naziv, cena, opis, slika, prodavnica)
        tipKucista = ''
        duzina = 0
        sirina = 0
        visina = 0
    }
}