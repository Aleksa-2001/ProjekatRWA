import { RacunarskaKomponenta } from "./racunarskaKomponenta";

export class CPU extends RacunarskaKomponenta {

    constructor(tip: number, proizvodjac: string, naziv: string, cena: number, slika: string, public frekvencija: number, public brojJezgara: number, public brojNiti: number) {
        super(tip, proizvodjac, naziv, cena, slika)
        frekvencija = 0
        brojJezgara = 0
        brojNiti = 0
    }
}