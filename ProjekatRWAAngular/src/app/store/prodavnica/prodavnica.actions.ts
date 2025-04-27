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
    "[Prodavnica] Setuj ID",
    props<{
        prodavnicaID: number
    }>()
)