import { Prodavnica } from "./prodavnica"
import { Proizvod } from "./proizvod"
import { User } from "./user"

export class Recenzija {
    
    constructor(
        public id: number, 
        public ocena: number, 
        public komentar: string, 
        public created_at: Date, 
        public updated_at: Date, 
        public user: User, 
        public prodavnica: Prodavnica, 
        public proizvod: Proizvod
    ) {
        id = 0
        ocena = 1
        komentar = ''
        created_at = new Date()
        updated_at = new Date()
        user
        prodavnica
        proizvod
    }
}