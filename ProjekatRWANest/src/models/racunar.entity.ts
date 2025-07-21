import { Proizvod } from "./proizvod.entity";
import { MaticnaPloca } from "./komponente/maticna-ploca.entity";
import { CPU } from "./komponente/cpu.entity";
import { RAM } from "./komponente/ram.entity";
import { Skladiste } from "./komponente/skladiste.entity";
import { GPU } from "./komponente/gpu.entity";
import { Napajanje } from "./komponente/napajanje.entity";
import { Kuciste } from "./komponente/kuciste.entity";
import { ChildEntity, JoinTable, ManyToMany, ManyToOne } from "typeorm";

@ChildEntity()
export class Racunar extends Proizvod {
    @ManyToOne(() => MaticnaPloca, { nullable: true, eager: true, onDelete: "SET NULL" })
    maticnaPloca: MaticnaPloca

    @ManyToOne(() => CPU, { nullable: true, eager: true, onDelete: "SET NULL" })
    cpu: CPU

    @ManyToOne(() => RAM, { nullable: true, eager: true, onDelete: "SET NULL" })
    ram: RAM

    @ManyToMany(() => Skladiste, { nullable: true, eager: true })
    @JoinTable({
        name: 'skladiste',
        joinColumn: { name: 'racunarID', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'skladisteID', referencedColumnName: 'id' }
    })
    skladiste: Skladiste[]

    @ManyToOne(() => Napajanje, {  nullable: true, eager: true, onDelete: "SET NULL" })
    napajanje: Napajanje

    @ManyToOne(() => GPU, { nullable: true, eager: true, onDelete: "SET NULL" })
    gpu: GPU

    @ManyToOne(() => Kuciste, { nullable: true, eager: true, onDelete: "SET NULL" })
    kuciste: Kuciste

}