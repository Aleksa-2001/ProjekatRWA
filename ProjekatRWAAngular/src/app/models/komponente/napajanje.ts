import { RacunarskaKomponenta } from "./racunarska-komponenta";

export class Napajanje extends RacunarskaKomponenta {

    constructor(
        id: number, 
        tip: number, 
        proizvodjac: string, 
        naziv: string, 
        slika: string, 
        public snaga: number, 
        public modularno: boolean
    ) {
        super(id, tip, proizvodjac, naziv, slika)
        snaga = 0
        modularno = false
    }
}