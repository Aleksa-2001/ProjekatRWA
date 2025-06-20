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

export const setSelectedItemID = createAction(
    "[Recenzija] Setuj ID recenzije",
    props<{
        recenzijaID: number
    }>()
)

export const loadSelectedItem = createAction(
    "[Recenzija] Ucitaj recenziju",
    props<{
        selectedRecenzijaID: number
    }>()
)

export const deselectSelectedItem = createAction(
    "[Recenzija] Deselektuj recenziju"
)

export const loadSelectedItemSuccess = createAction(
    "[Recenzija] Ucitavanje recenzije je uspesno",
    props<{
        selectedRecenzija: Recenzija
    }>()
)
