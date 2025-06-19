import { User } from "src/models/user.entity"
import { Prodavnica } from "src/models/prodavnica.entity"
import { Proizvod } from "src/models/proizvod.entity"

export class RecenzijaDto {
    ocena: number
    komentar?: string
    user: User
    prodavnica?: Prodavnica
    proizvod?: Proizvod
}