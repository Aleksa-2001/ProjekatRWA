import { Prodavnica } from "../../prodavnice/entities/prodavnica.entity"

export abstract class ProizvodDto {
    tip: string
    proizvodjac: string
    naziv: string
    cena: number
    opis: string
    slika: string
    prodavnica: Prodavnica
}