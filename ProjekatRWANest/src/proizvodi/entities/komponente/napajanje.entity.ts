import { ChildEntity } from "typeorm"
import { RacunarskaKomponenta } from "../racunarska-komponenta.entity"

@ChildEntity()
export class Napajanje extends RacunarskaKomponenta {

    //constructor(
    //    id: number, 
    //    tip: number, 
    //    proizvodjac: string, 
    //    naziv: string, 
    //    cena: number, 
    //    opis: string, 
    //    slika: string, 
    //    prodavnica: Prodavnica, 
    //    tipKomponente: TipKomponente, 
    //    public snaga: number, 
    //    public modularno: boolean
    //) {
    //    super(id, tip, proizvodjac, naziv, cena, opis, slika, prodavnica, tipKomponente)
    //    snaga = 0
    //    modularno = false
    //}
}