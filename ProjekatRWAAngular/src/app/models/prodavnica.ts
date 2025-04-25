import { Proizvod } from "./proizvod"

export class Prodavnica {
    
    constructor(public id: number, public naziv: string, public adresa: string, public opis: string, public proizvodi: Proizvod[]) {
        id = 0
        naziv = ''
        adresa = ''
        opis = ''
        proizvodi = []
    }
}