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

export const increaseAmount = createAction(
    "[Korpa] Uvecaj kolicinu",
    props<{
        artikal: Artikal
    }>()
)

export const decreaseAmount = createAction(
    "[Korpa] Umanji kolicinu",
    props<{
        artikal: Artikal
    }>()
)

export const removeFromCart = createAction(
    "[Korpa] Ukloni iz korpe",
    props<{
        artikal: Artikal
    }>()
)

export const clearCart = createAction(
    "[Korpa] Isprazni korpu"
)