import { RacunarskaKomponenta } from "../racunarska-komponenta";
import { Prodavnica } from "../prodavnica";

export class RAM extends RacunarskaKomponenta {

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
        public tipMemorije: string, 
        public brojRAMModula: number, 
        public velicina: number,
        public frekvencija: number
    ) {
        super(id, tip, proizvodjac, naziv, cena, opis, slika, prodavnica, tipKomponente)
        tipMemorije = ''
        brojRAMModula = 0
        velicina = 0
        frekvencija = 0
    }
}