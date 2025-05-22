import { Prodavnica } from "../../prodavnice/entities/prodavnica.entity"

export class ProizvodDto {
    tip: number
    proizvodjac: string
    naziv: string
    cena: number
    opis: string
    slika: string
    prodavnica: Prodavnica
}