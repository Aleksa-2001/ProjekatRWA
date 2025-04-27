import { Prodavnica } from "./prodavnica"

export abstract class Proizvod {

    constructor(
        public id: number, 
        public tip: number, 
        public proizvodjac: string, 
        public naziv: string, 
        public cena: number, 
        public opis: string,
        public slika: string, 
        public prodavnica: Prodavnica
    ) {
        id = 0
        tip = 0
        proizvodjac = ''
        naziv = ''
        cena = 0
        opis = ''
        slika = ''
        prodavnica
    }
}