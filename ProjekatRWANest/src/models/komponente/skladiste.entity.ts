import { ChildEntity, Column } from "typeorm"
import { RacunarskaKomponenta } from "../racunarska-komponenta.entity";

@ChildEntity()
export class Skladiste extends RacunarskaKomponenta {
    @Column()
    tipMemorije: string

    @Column()
    velicina: number
    
}