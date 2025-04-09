import { RacunarskaKomponenta } from "./racunarskaKomponenta";

export class CPU extends RacunarskaKomponenta {

    constructor(id: number, tip: number, proizvodjac: string, naziv: string, cena: number, slika: string, public frekvencija: number, public brojJezgara: number, public brojNiti: number) {
        super(id, tip, proizvodjac, naziv, cena, slika)
        frekvencija = 0
        brojJezgara = 0
        brojNiti = 0
    }
}