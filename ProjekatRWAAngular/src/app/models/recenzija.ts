import { Prodavnica } from "./prodavnica"
import { Proizvod } from "./proizvod"
import { User } from "./user"

export class Recenzija {
    
    constructor(
        public id: number, 
        public ocena: number, 
        public komentar: string, 
        public user: User, 
        public prodavnica: Prodavnica, 
        public proizvod: Proizvod
    ) {
        id = 0
        ocena = 1
        komentar = ''
        user
        prodavnica
        proizvod
    }
}