import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, TableInheritance } from "typeorm"
import { Prodavnica } from "./prodavnica.entity"
import { Recenzija } from "./recenzija.entity"

@Entity()
@TableInheritance({ column: { type: "varchar", name: "type" } })
export abstract class Proizvod {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    type: string

    @Column()
    tipProizvoda: string
    
    @Column()
    proizvodjac: string
    
    @Column()
    naziv: string
    
    @Column()
    cena: number
    
    @Column({ nullable: true })
    opis: string
    
    @Column({ nullable: true })
    slika: string
    
    @ManyToOne(() => Prodavnica)
    prodavnica: Prodavnica

    @OneToMany(() => Recenzija, recenzija => recenzija.proizvod)
    recenzije: Recenzija[]

}