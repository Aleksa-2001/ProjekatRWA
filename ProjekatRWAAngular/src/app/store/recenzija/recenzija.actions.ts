import { createAction, props } from "@ngrx/store"
import { Recenzija } from "../../models/recenzija"
import { Update } from "@ngrx/entity"

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

export const addItem = createAction(
    "[Recenzija] Dodaj recenziju",
    props<{
        recenzija: Recenzija
    }>()
)

export const addItemSuccess = createAction(
    "[Recenzija] Dodavanje recenzije je uspesno",
    props<{
        recenzija: Recenzija
    }>()
)

export const updateItem = createAction(
    "[Recenzija] Izmeni recenziju",
    props<{
        selectedRecenzijaID: number,
        selectedRecenzija: Recenzija
    }>()
)

export const updateItemSuccess = createAction(
    "[Recenzija] Izmena recenzije je uspesna",
    props<{
        recenzija: Update<Recenzija>
        //selectedRecenzija: Recenzija
    }>()
)

export const deleteItem = createAction(
    "[Recenzija] Obrisi recenziju",
    props<{
        selectedRecenzijaID: number
    }>()
)

export const deleteItemSuccess = createAction(
    "[Recenzija] Recenzija uspesno obrisana",
    props<{
        recenzijaID: number
    }>()
)