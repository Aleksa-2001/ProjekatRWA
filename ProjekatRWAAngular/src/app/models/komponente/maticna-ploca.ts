import { RacunarskaKomponenta } from "../racunarska-komponenta";
import { Prodavnica } from "../prodavnica";

export class MaticnaPloca extends RacunarskaKomponenta {

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
        public tipMaticnePloce: string, 
        public socket: string, 
        public brojRAMSlotova: number, 
        public brojUSB20Portova: number | null, 
        public brojUSB30Portova: number | null, 
        public brojUSB31Portova: number | null
    ) {
        super(id, type, tipProizvoda, proizvodjac, naziv, cena, opis, slika, prodavnica)
        tipMaticnePloce = ''
        socket = ''
        brojRAMSlotova = 0
        brojUSB20Portova = 0
        brojUSB30Portova = 0
        brojUSB31Portova = 0
    }
}