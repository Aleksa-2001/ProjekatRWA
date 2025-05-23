import { Prodavnica } from "./prodavnica"

export abstract class Proizvod {
    
    constructor(
        public id: number, 
        public tip: string, 
        public proizvodjac: string, 
        public naziv: string, 
        public cena: number, 
        public opis: string,
        public slika: string, 
        public prodavnica: Prodavnica
    ) {
        id = 0
        tip = ''
        proizvodjac = ''
        naziv = ''
        cena = 0
        opis = ''
        slika = ''
        prodavnica
    }
}