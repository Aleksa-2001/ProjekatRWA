import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Prodavnica {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    naziv: string

    @Column()
    adresa: string

    @Column({ nullable: true })
    opis: string
    
    @Column({ nullable: true })
    slika: string
    
}