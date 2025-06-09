import { ChildEntity, Column } from "typeorm"
import { RacunarskaKomponenta } from "../racunarska-komponenta.entity";

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
    
}