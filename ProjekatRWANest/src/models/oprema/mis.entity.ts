import { ChildEntity, Column } from "typeorm"
import { RacunarskaOprema } from "../racunarska-oprema";

@ChildEntity()
export class Mis extends RacunarskaOprema {
    @Column()
    tipMisa: string

    @Column()
    senzor: string

    @Column()
    DPI: number

    @Column()
    promenljivDPI: boolean

    @Column()
    pozadinskoOsvetljenje: boolean
    
}