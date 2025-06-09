import { ChildEntity, Column } from "typeorm";
import { RacunarskaKomponenta } from "../racunarska-komponenta.entity";

@ChildEntity()
export class GPU extends RacunarskaKomponenta {
    @Column()
    frekvencija: number

    @Column()
    VRAM: number
    
}