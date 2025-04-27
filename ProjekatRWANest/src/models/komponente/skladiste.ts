import { RacunarskaKomponenta } from "./racunarska-komponenta";
import { Prodavnica } from "../prodavnica";
import { TipKomponente } from "../tip-komponente";

export class Skladiste extends RacunarskaKomponenta {

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
        public tipMemorije: string, 
        public velicina: number
    ) {
        super(id, tip, proizvodjac, naziv, cena, opis, slika, prodavnica, tipKomponente)
        tipMemorije = ''
        velicina = 0
    }
}