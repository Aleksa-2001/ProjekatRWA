import { ChildEntity, Column } from "typeorm"
import { RacunarskaOprema } from "../racunarska-oprema";

@ChildEntity()
export class Zvucnik extends RacunarskaOprema {
    @Column()
    tipZvucnika: string

    @Column()
    frekvencijaMin: number

    @Column()
    frekvencijaMax: number
    
}