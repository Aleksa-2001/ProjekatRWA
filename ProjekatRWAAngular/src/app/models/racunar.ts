import { Proizvod } from "./proizvod";
import { Prodavnica } from "./prodavnica";
import { CPU } from "./komponente/cpu";
import { GPU } from "./komponente/gpu";
import { RAM } from "./komponente/ram";
import { MaticnaPloca } from "./komponente/maticna-ploca";
import { Napajanje } from "./komponente/napajanje";
import { Skladiste } from "./komponente/skladiste";
import { Kuciste } from "./komponente/kuciste";

export class Racunar extends Proizvod {
    
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
        public maticnaPloca: MaticnaPloca | null,
        public cpu: CPU | null, 
        public ram: RAM | null, 
        public skladiste: Skladiste[], 
        public napajanje: Napajanje | null,
        public gpu: GPU | null,
        public kuciste: Kuciste | null
    ) {
        super(id, type, tipProizvoda, proizvodjac, naziv, cena, opis, slika, prodavnica)
        maticnaPloca = null
        cpu = null
        ram = null
        skladiste = []
        napajanje = null
        gpu = null
        kuciste = null
    }
}