import { ChildEntity, Column } from "typeorm";
import { RacunarskaKomponenta } from "../racunarska-komponenta.entity";

@ChildEntity()
export class MaticnaPloca extends RacunarskaKomponenta {
    @Column()
    tipMaticnePloce: string

    @Column()
    socket: string

    @Column()
    brojRAMSlotova: number

    @Column()
    brojUSB20Portova: number

    @Column()
    brojUSB30Portova: number

    @Column()
    brojUSB31Portova: number
    
}