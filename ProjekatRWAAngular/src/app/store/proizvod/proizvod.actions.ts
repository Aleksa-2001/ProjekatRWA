import { createAction, props } from "@ngrx/store";
import { Proizvod } from "../../models/proizvod";

export const loadItems = createAction(
    "[Proizvod] Ucitaj listu",
    props<{
        prodavnicaID: number
    }>()
)

export const loadItemsSuccess = createAction(
    "[Proizvod] Ucitavanje liste je uspesno",
    props<{
        proizvodi: Proizvod[]
    }>()
)

export const setSelectedItemID = createAction(
    "[Proizvod] Setuj ID proizvoda",
    props<{
        proizvodID: number
    }>()
)

export const loadSelectedItem = createAction(
    "[Proizvod] Ucitaj proizvod",
    props<{
        selectedProizvodID: number
    }>()
)

export const loadSelectedItemSuccess = createAction(
    "[Proizvod] Ucitavanje proizvoda je uspesno",
    props<{
        selectedProizvod: Proizvod
    }>()
)

export const setItem = createAction(
    "[Proizvod] Promeni cenu (test)",
    props<{
        proizvodID: number,
        novaCena: number
    }>()
)