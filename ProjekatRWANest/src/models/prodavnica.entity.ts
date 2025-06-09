import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Prodavnica {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    naziv: string

    @Column()
    adresa: string

    @Column()
    opis: string
    
    @Column()
    slika: string
    
    //constructor(id: number, naziv: string, adresa: string, opis: string, slika: string) {
    //    id = 0
    //    naziv = ''
    //    adresa = ''
    //    opis = ''
    //    slika = ''
    //}
}