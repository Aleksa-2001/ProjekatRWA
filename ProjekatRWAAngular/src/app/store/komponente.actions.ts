import { createAction, props } from "@ngrx/store";
import { RacunarskaKomponenta } from "../models/racunarskaKomponenta";

export const loadItems = createAction(
    "Ucitaj listu"
)

export const loadItemsSuccess = createAction(
    "Ucitavanje liste je uspesno",
    props<{
        komponente: RacunarskaKomponenta[]
    }>()
)

export const setItem = createAction(
    "Promeni cenu (test)",
    props<{
        komponentaID: number,
        novaCena: number
    }>()
)