import { Prodavnica } from "./prodavnica"

export abstract class Proizvod {
    
    constructor(
        public id: number, 
        public type: string, 
        public tipProizvoda: string, 
        public proizvodjac: string, 
        public naziv: string, 
        public cena: number, 
        public opis: string,
        public slika: string, 
        public prodavnica: Prodavnica
    ) {
        id = 0,
        type = ''
        tipProizvoda = ''
        proizvodjac = ''
        naziv = ''
        cena = 0
        opis = ''
        slika = ''
        prodavnica
    }
}