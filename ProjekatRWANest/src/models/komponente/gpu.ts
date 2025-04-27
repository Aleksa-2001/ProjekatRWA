import { RacunarskaKomponenta } from "./racunarska-komponenta";
import { Prodavnica } from "../prodavnica";
import { TipKomponente } from "../tip-komponente";

export class GPU extends RacunarskaKomponenta {

    constructor(
        id: number, 
        tip: number, 
        proizvodjac: string, 
        naziv: string, 
        cena: number, 
        opis: string, 
        slika: string, 
        prodavnica: Prodavnica, 
        tipKomponente: TipKomponente, 
        public frekvencija: number, 
        public VRAM: number
    ) {
        super(id, tip, proizvodjac, naziv, cena, opis, slika, prodavnica, tipKomponente)
        frekvencija = 0
        VRAM = 0
    }
}