import { ChildEntity, Column } from "typeorm";
import { RacunarskaKomponenta } from "../racunarska-komponenta.entity";

@ChildEntity()
export class CPU extends RacunarskaKomponenta {
    @Column()
    socket: string

    @Column({ type: "float" })
    frekvencija: number

    @Column()
    brojJezgara: number
    
    @Column()
    brojNiti: number

}