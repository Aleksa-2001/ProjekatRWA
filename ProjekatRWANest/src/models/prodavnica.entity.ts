import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Recenzija } from "./recenzija.entity"

@Entity()
export class Prodavnica {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    naziv: string

    @Column()
    adresa: string

    @Column()
    grad: string

    @Column({ nullable: true })
    opis: string
    
    @Column({ nullable: true })
    slika: string

    @OneToMany(() => Recenzija, recenzija => recenzija.prodavnica)
    recenzije: Recenzija[]
    
}