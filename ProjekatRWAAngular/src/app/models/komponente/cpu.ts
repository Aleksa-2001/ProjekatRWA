import { RacunarskaKomponenta } from "./racunarska-komponenta";
import { Prodavnica } from "../prodavnica";
import { TipKomponente } from "../tip-komponente";

export class CPU extends RacunarskaKomponenta {

    constructor(
        id: number, 
        tip: number, 
        proizvodjac: string, 
        naziv: string, 
        cena: number, 
        opis: string, 
        slika: string, 
        prodavnica: Prodavnica, 
        tipKomponente: TipKomponente, 
        public socket: number, 
        public frekvencija: number, 
        public brojJezgara: number, 
        public brojNiti: number
    ) {
        super(id, tip, proizvodjac, naziv, cena, opis, slika, prodavnica, tipKomponente)
        socket = 0
        frekvencija = 0
        brojJezgara = 0
        brojNiti = 0
    }
}