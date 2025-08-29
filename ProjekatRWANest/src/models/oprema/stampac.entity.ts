import { ChildEntity, Column } from "typeorm"
import { RacunarskaOprema } from "../racunarska-oprema";

@ChildEntity()
export class Stampac extends RacunarskaOprema {
    @Column()
    tipStampaca: string

    @Column()
    bojaStampe: string

    @Column()
    format: string

    @Column()
    rezolucija: number

    @Column()
    obostranoStampanje: boolean
    
}