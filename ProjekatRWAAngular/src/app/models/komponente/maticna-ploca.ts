import { RacunarskaKomponenta } from "./racunarska-komponenta";

export class MaticnaPloca extends RacunarskaKomponenta {

    constructor(
        id: number, 
        tip: number, 
        proizvodjac: string, 
        naziv: string, 
        slika: string, 
        public socket: string, 
        public brojRAMSlotova: number, 
        public brojUSB20Portova: number,
        public brojUSB30Portova: number,
        public brojUSB31Portova: number,
    ) {
        super(id, tip, proizvodjac, naziv, slika)
        socket = ''
        brojRAMSlotova = 0
        brojUSB20Portova = 0
        brojUSB30Portova = 0
        brojUSB31Portova = 0
    }
}