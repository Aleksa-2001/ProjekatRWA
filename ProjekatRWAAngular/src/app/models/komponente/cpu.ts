import { RacunarskaKomponenta } from "./racunarska-komponenta";

export class CPU extends RacunarskaKomponenta {

    constructor(
        id: number, 
        tip: number, 
        proizvodjac: string, 
        naziv: string, 
        slika: string, 
        public socket: number, 
        public frekvencija: number, 
        public brojJezgara: number, 
        public brojNiti: number
    ) {
        super(id, tip, proizvodjac, naziv, slika)
        socket = 0
        frekvencija = 0
        brojJezgara = 0
        brojNiti = 0
    }
}