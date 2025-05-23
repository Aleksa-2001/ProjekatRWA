import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, TableInheritance } from "typeorm"
import { Prodavnica } from "../../prodavnice/entities/prodavnica.entity"

@Entity()
@TableInheritance({ column: { type: "varchar", name: "tip" } })
export abstract class Proizvod {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    tip: string;
    
    @Column()
    proizvodjac: string
    
    @Column()
    naziv: string
    
    @Column()
    cena: number
    
    @Column()
    opis: string
    
    @Column()
    slika: string
    
    @ManyToOne(() => Prodavnica, { onDelete: 'CASCADE' })
    prodavnica: Prodavnica

    // constructor(
    //     id: number, 
    //     tip: number, 
    //     proizvodjac: string, 
    //     naziv: string, 
    //     cena: number, 
    //     opis: string, 
    //     slika: string, 
    //     prodavnica: Prodavnica
    // ) {
    //     id = 0
    //     tip = 0
    //     proizvodjac = ''
    //     naziv = ''
    //     cena = 0
    //     opis = ''
    //     slika = ''
    //     prodavnica
    // }
}