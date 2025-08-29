import { ChildEntity, Column } from "typeorm"
import { RacunarskaOprema } from "../racunarska-oprema";

@ChildEntity()
export class Monitor extends RacunarskaOprema {
    @Column()
    tipPanela: string

    @Column()
    rezolucijaSirina: number

    @Column()
    rezolucijaVisina: number

    @Column()
    refreshRate: number

    @Column({ type: 'float' })
    dijagonala: number

    @Column({ nullable: true })
    brojHDMIKonektora: number

    @Column({ nullable: true })
    brojDisplayPortKonektora: number
    
}