import { Proizvod } from "./proizvod"
import { Prodavnica } from "./prodavnica"

export abstract class RacunarskaOprema extends Proizvod {

    constructor(
        id: number, 
        type: string, 
        tip: string, 
        proizvodjac: string, 
        naziv: string, 
        cena: number, 
        opis: string, 
        slika: string, 
        prodavnica: Prodavnica
    ) {
        super(id, type, tip, proizvodjac, naziv, cena, opis, slika, prodavnica)
    }
}