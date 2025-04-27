import { createAction, props } from "@ngrx/store";
import { RacunarskaKomponenta } from "../../models/komponente/racunarska-komponenta";

export const loadItems = createAction(
    "[Komponenta] Ucitaj listu"
)

export const loadItemsSuccess = createAction(
    "[Komponenta] Ucitavanje liste je uspesno",
    props<{
        komponente: RacunarskaKomponenta[]
    }>()
)

export const setItem = createAction(
    "[Komponenta] Promeni cenu (test)",
    props<{
        komponentaID: number,
        novaCena: number
    }>()
)