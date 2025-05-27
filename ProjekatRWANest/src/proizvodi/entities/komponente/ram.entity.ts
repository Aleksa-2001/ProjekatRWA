import { ChildEntity, Column } from "typeorm"
import { RacunarskaKomponenta } from "../racunarska-komponenta.entity"

@ChildEntity()
export class RAM extends RacunarskaKomponenta {
    @Column()
    tipMemorije: string

    @Column()
    brojRAMModula: number

    @Column()
    velicina: number
    
    @Column()
    frekvencija: number

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
    //    public tipMemorije: string, 
    //    public brojRAMModula: number, 
    //    public velicina: number,
    //    public frekvencija: number
    //) {
    //    super(id, tip, proizvodjac, naziv, cena, opis, slika, prodavnica, tipKomponente)
    //    tipMemorije = ''
    //    brojRAMModula = 0
    //    velicina = 0
    //    frekvencija = 0
    //}
}