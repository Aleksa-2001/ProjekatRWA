import { ChildEntity, Column } from "typeorm"
import { RacunarskaKomponenta } from "../racunarska-komponenta.entity";

@ChildEntity()
export class Napajanje extends RacunarskaKomponenta {
    @Column()
    snaga: number

    @Column()
    modularno: boolean
    
}