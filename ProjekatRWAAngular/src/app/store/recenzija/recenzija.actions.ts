import { createAction, props } from "@ngrx/store"
import { Recenzija } from "../../models/recenzija"

export const loadItemsProdavnica = createAction(
    "[Recenzija] Ucitaj listu recenzija prodavnice",
    props<{
        prodavnicaID: number
    }>()
)

export const loadItemsProizvod = createAction(
    "[Recenzija] Ucitaj listu recenzija proizvoda",
    props<{
        proizvodID: number
    }>()
)

export const loadItemsSuccess = createAction(
    "[Recenzija] Ucitavanje liste je uspesno",
    props<{
        recenzije: Recenzija[]
    }>()
)