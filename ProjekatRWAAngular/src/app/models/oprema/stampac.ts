import { RacunarskaOprema } from "../racunarska-oprema";
import { Prodavnica } from "../prodavnica";

export class Stampac extends RacunarskaOprema {

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
        public tipStampaca: string, 
        public bojaStampe: string, 
        public format: string, 
        public rezolucija: number, 
        public obostranoStampanje: boolean
    ) {
        super(id, type, tipProizvoda, proizvodjac, naziv, cena, opis, slika, prodavnica)
        tipStampaca = ''
        bojaStampe = ''
        format = ''
        rezolucija = 0
        obostranoStampanje = false
    }
}