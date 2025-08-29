import { ChildEntity, Column } from "typeorm"
import { RacunarskaOprema } from "../racunarska-oprema";

@ChildEntity()
export class Tastatura extends RacunarskaOprema {
    @Column()
    tipTastature: string

    @Column()
    tipTastera: string

    @Column()
    pozadinskoOsvetljenje: boolean
    
}