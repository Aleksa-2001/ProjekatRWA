import { RacunarskaOprema } from "../racunarska-oprema";
import { Prodavnica } from "../prodavnica";

export class Monitor extends RacunarskaOprema {

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
        public tipPanela: string, 
        public rezolucijaSirina: number, 
        public rezolucijaVisina: number, 
        public refreshRate: number, 
        public dijagonala: number, 
        public brojHDMIKonektora: number | null, 
        public brojDisplayPortKonektora: number | null
    ) {
        super(id, type, tipProizvoda, proizvodjac, naziv, cena, opis, slika, prodavnica)
        tipPanela = ''
        rezolucijaSirina = 0
        rezolucijaVisina = 0
        refreshRate = 0
        dijagonala = 0
        brojHDMIKonektora = 0
        brojDisplayPortKonektora = 0
    }
}