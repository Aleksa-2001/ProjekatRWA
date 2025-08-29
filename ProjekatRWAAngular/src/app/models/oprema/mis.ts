import { RacunarskaOprema } from "../racunarska-oprema";
import { Prodavnica } from "../prodavnica";

export class Mis extends RacunarskaOprema {

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
        public tipMisa: string, 
        public senzor: string, 
        public DPI: number, 
        public promenljivDPI: boolean, 
        public pozadinskoOsvetljenje: boolean
    ) {
        super(id, type, tipProizvoda, proizvodjac, naziv, cena, opis, slika, prodavnica)
        tipMisa = ''
        senzor = ''
        DPI = 0
        promenljivDPI = false, 
        pozadinskoOsvetljenje = false
    }
}