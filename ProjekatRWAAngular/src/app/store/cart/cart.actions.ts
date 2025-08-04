import { createAction, props } from "@ngrx/store"
import { Artikal } from "./cart.reducer"
import { Proizvod } from "../../models/proizvod"

export const loadItems = createAction(
    "[Korpa] Ucitaj listu"
)

export const addToCart = createAction(
    "[Korpa] Dodaj u korpu",
    props<{
        proizvod: Proizvod
    }>()
)

export const removeFromCart = createAction(
    "[Korpa] Ukloni iz korpe",
    props<{
        proizvod: Proizvod
    }>()
)

export const clearCart = createAction(
    "[Korpa] Isprazni korpu"
)