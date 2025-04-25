import { RacunarskaKomponenta } from "./racunarska-komponenta";

export class GPU extends RacunarskaKomponenta {

    constructor(
        id: number, 
        tip: number, 
        proizvodjac: string, 
        naziv: string, 
        slika: string, 
        public frekvencija: number, 
        public VRAM: number
    ) {
        super(id, tip, proizvodjac, naziv, slika)
        frekvencija = 0
        VRAM = 0
    }
}