import { RacunarskaKomponenta } from "../racunarska-komponenta";
import { Prodavnica } from "../../prodavnice/entities/prodavnica.entity";
import { TipKomponente } from "../tip-komponente";

export class MaticnaPloca extends RacunarskaKomponenta {

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
        public velicina: string, 
        public socket: string, 
        public brojRAMSlotova: number, 
        public brojUSB20Portova: number,
        public brojUSB30Portova: number,
        public brojUSB31Portova: number
    ) {
        super(id, tip, proizvodjac, naziv, cena, opis, slika, prodavnica, tipKomponente)
        velicina = ''
        socket = ''
        brojRAMSlotova = 0
        brojUSB20Portova = 0
        brojUSB30Portova = 0
        brojUSB31Portova = 0
    }
}