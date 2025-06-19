import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./user.entity"
import { Prodavnica } from "./prodavnica.entity"
import { Proizvod } from "./proizvod.entity"

@Entity()
export class Recenzija {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    ocena: number

    @Column({ nullable: true })
    komentar: string

    @ManyToOne(() => User)
    user: User

    @ManyToOne(() => Prodavnica, { nullable: true })
    prodavnica: Prodavnica

    @ManyToOne(() => Proizvod, { nullable: true })
    proizvod: Proizvod
    
}