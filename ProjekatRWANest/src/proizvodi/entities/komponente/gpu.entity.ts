import { ChildEntity, Column } from "typeorm";
import { RacunarskaKomponenta } from "../racunarska-komponenta.entity";

@ChildEntity()
export class GPU extends RacunarskaKomponenta {
    @Column()
    frekvencija: number

    @Column()
    VRAM: number
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
    //    public frekvencija: number, 
    //    public VRAM: number
    //) {
    //    super(id, tip, proizvodjac, naziv, cena, opis, slika, prodavnica, tipKomponente)
    //    frekvencija = 0
    //    VRAM = 0
    //}
}