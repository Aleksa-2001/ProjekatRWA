import { createAction, props } from "@ngrx/store";
import { Prodavnica } from "../../models/prodavnica";

export const loadItems = createAction(
    "[Prodavnica] Ucitaj listu"
)

export const loadItemsSuccess = createAction(
    "[Prodavnica] Ucitavanje liste je uspesno",
    props<{
        prodavnice: Prodavnica[]
    }>()
)

export const setSelectedItemID = createAction(
    "[Prodavnica] Setuj ID prodavnice",
    props<{
        prodavnicaID: number
    }>()
)

export const loadSelectedItem = createAction(
    "[Prodavnica] Ucitaj prodavnicu",
    props<{
        selectedProdavnicaID: number
    }>()
)

export const deselectSelectedItem = createAction(
    "[Prodavnica] Deselektuj prodavnicu"
)

export const loadSelectedItemSuccess = createAction(
    "[Prodavnica] Ucitavanje prodavnice je uspesno",
    props<{
        selectedProdavnica: Prodavnica
    }>()
)