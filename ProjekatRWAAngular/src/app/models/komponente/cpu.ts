import { RacunarskaKomponenta } from "../racunarska-komponenta";
import { Prodavnica } from "../prodavnica";

export class CPU extends RacunarskaKomponenta {

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
        public socket: number, 
        public frekvencija: number, 
        public brojJezgara: number, 
        public brojNiti: number
    ) {
        super(id, type, tipProizvoda, proizvodjac, naziv, cena, opis, slika, prodavnica)
        socket = 0
        frekvencija = 0
        brojJezgara = 0
        brojNiti = 0
    }
}