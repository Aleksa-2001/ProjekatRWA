import { RacunarskaKomponenta } from "../racunarska-komponenta";
import { Prodavnica } from "../prodavnica";

export class RAM extends RacunarskaKomponenta {

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
        public brojRAMModula: number, 
        public velicina: number,
        public frekvencija: number
    ) {
        super(id, type, tipProizvoda, proizvodjac, naziv, cena, opis, slika, prodavnica)
        tipMemorije = ''
        brojRAMModula = 0
        velicina = 0
        frekvencija = 0
    }
}