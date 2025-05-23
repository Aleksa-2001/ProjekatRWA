import { Proizvod } from "./proizvod.entity"
import { ChildEntity, Column } from "typeorm"

@ChildEntity()
export abstract class RacunarskaKomponenta extends Proizvod {
    @Column()
    tipKomponente: string
    
    //constructor(
    //    id: number, 
    //    tip: number, 
    //    proizvodjac: string, 
    //    naziv: string, 
    //    cena: number, 
    //    opis: string, 
    //    slika: string, 
    //    prodavnica: Prodavnica, 
    //    tipKomponente: TipKomponente
    //) {
    //    //super(id, tip, proizvodjac, naziv, cena, opis, slika, prodavnica)
    //    tipKomponente
    //}
}