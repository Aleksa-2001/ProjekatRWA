import { RacunarskaKomponenta } from "../racunarska-komponenta";
import { Prodavnica } from "../prodavnica";

export class Skladiste extends RacunarskaKomponenta {

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
        public tipMemorije: string, 
        public velicina: number
    ) {
        super(id, type, tipProizvoda, proizvodjac, naziv, cena, opis, slika, prodavnica)
        tipMemorije = ''
        velicina = 0
    }
}