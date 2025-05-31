import { Proizvod } from "./proizvod";
import { Prodavnica } from "./prodavnica";
import { CPU } from "./komponente/cpu";
import { GPU } from "./komponente/gpu";
import { RAM } from "./komponente/ram";
import { MaticnaPloca } from "./komponente/maticna-ploca";
import { Napajanje } from "./komponente/napajanje";
import { Skladiste } from "./komponente/skladiste";

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
        maticnaPloca: MaticnaPloca,
        cpu: CPU, 
        ram: RAM, 
        skladiste: Skladiste[], 
        napajanje: Napajanje,
        gpu: GPU
    ) {
        super(id, type, tipProizvoda, proizvodjac, naziv, cena, opis, slika, prodavnica)
        maticnaPloca
        cpu
        ram
        skladiste
        napajanje
        gpu
    }
}