import { RacunarskaKomponenta } from "./racunarska-komponenta";
import { Prodavnica } from "../prodavnica";
import { TipKomponente } from "../tip-komponente";

export class Napajanje extends RacunarskaKomponenta {

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
        public snaga: number, 
        public modularno: boolean
    ) {
        super(id, tip, proizvodjac, naziv, cena, opis, slika, prodavnica, tipKomponente)
        snaga = 0
        modularno = false
    }
}