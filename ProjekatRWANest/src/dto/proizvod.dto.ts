import { Prodavnica } from "../models/prodavnica.entity"

export abstract class ProizvodDto {
    type: string
    tipProizvoda: string
    proizvodjac: string
    naziv: string
    cena: number
    opis?: string
    slika?: string
    prodavnica: Prodavnica
}