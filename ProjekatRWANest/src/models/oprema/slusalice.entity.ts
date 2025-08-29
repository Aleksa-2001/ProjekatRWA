import { ChildEntity, Column } from "typeorm"
import { RacunarskaOprema } from "../racunarska-oprema";

@ChildEntity()
export class Slusalice extends RacunarskaOprema {
    @Column()
    tipSlusalica: string

    @Column()
    povezivanje: string

    @Column()
    frekvencijaMin: number

    @Column()
    frekvencijaMax: number

    @Column()
    mikrofon: boolean
    
}