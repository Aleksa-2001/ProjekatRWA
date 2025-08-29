import { RacunarskaOprema } from "../racunarska-oprema";
import { Prodavnica } from "../prodavnica";

export class Slusalice extends RacunarskaOprema {

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
        public tipSlusalica: string, 
        public povezivanje: string, 
        public frekvencijaMin: number, 
        public frekvencijaMax: number, 
        public mikrofon: boolean
    ) {
        super(id, type, tipProizvoda, proizvodjac, naziv, cena, opis, slika, prodavnica)
        tipSlusalica = ''
        povezivanje = ''
        frekvencijaMin = 0
        frekvencijaMax = 0
        mikrofon = false
    }
}