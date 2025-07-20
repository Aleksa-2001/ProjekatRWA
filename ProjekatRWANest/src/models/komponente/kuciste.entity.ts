import { ChildEntity, Column } from "typeorm";
import { RacunarskaKomponenta } from "../racunarska-komponenta.entity";

@ChildEntity()
export class Kuciste extends RacunarskaKomponenta {
    @Column()
    tipKucista: string

    @Column({ type: "float" })
    duzina: number

    @Column({ type: "float" })
    sirina: number

    @Column({ type: "float" })
    visina: number
    
}