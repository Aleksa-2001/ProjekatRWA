import { RacunarskaKomponenta } from "./racunarska-komponenta";

export class Skladiste extends RacunarskaKomponenta {

    constructor(
        id: number, 
        tip: number, 
        proizvodjac: string, 
        naziv: string, 
        slika: string, 
        public tipMemorije: string, 
        public velicina: number
    ) {
        super(id, tip, proizvodjac, naziv, slika)
        tipMemorije = ''
        velicina = 0
    }
}