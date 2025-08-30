export class Prodavnica {
    
    constructor(
        public id: number, 
        public naziv: string, 
        public adresa: string, 
        public grad: string, 
        public opis: string, 
        public slika: string
    ) {
        id = 0
        naziv = ''
        adresa = ''
        grad = ''
        opis = ''
        slika = ''
    }
}