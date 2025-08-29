import { RacunarskaOprema } from "../racunarska-oprema";
import { Prodavnica } from "../prodavnica";

export class Tastatura extends RacunarskaOprema {

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
        public tipTastature: string, 
        public tipTastera: string, 
        public pozadinskoOsvetljenje: boolean
    ) {
        super(id, type, tipProizvoda, proizvodjac, naziv, cena, opis, slika, prodavnica)
        tipTastature = ''
        tipTastera = ''
        pozadinskoOsvetljenje = false
    }
}