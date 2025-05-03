import { Proizvod } from "../proizvod"
import { Prodavnica } from "../prodavnica"
import { TipKomponente } from "../tip-komponente"

export abstract class RacunarskaKomponenta extends Proizvod {

    constructor(
        id: number, 
        tip: number, 
        proizvodjac: string, 
        naziv: string, 
        cena: number, 
        opis: string, 
        slika: string, 
        prodavnica: Prodavnica, 
        public tipKomponente: TipKomponente
    ) {
        super(id, tip, proizvodjac, naziv, cena, opis, slika, prodavnica)
        tipKomponente
    }
}