import { Proizvod } from "./proizvod"
import { Prodavnica } from "./prodavnica"

export abstract class RacunarskaKomponenta extends Proizvod {

    constructor(
        id: number, 
        tip: string, 
        proizvodjac: string, 
        naziv: string, 
        cena: number, 
        opis: string, 
        slika: string, 
        prodavnica: Prodavnica, 
        public tipKomponente: string
    ) {
        super(id, tip, proizvodjac, naziv, cena, opis, slika, prodavnica)
        tipKomponente = ''
    }
}