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

    @Column({ nullable: true })
    brojUSB20Portova: number

    @Column({ nullable: true })
    brojUSB30Portova: number

    @Column({ nullable: true })
    brojUSB31Portova: number
    
}