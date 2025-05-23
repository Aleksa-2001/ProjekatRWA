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

export const deselectSelectedItem = createAction(
    "[Proizvod] Deselektuj proizvod"
)

export const addItem = createAction(
    "[Proizvod] Dodaj proizvod",
    props<{
        proizvod: Proizvod
    }>()
)

export const addItemSuccess = createAction(
    "[Proizvod] Dodavanje proizvoda je uspesno",
    props<{
        proizvod: Proizvod
    }>()
)

export const updateItem = createAction(
    "[Proizvod] Izmeni proizvod",
    props<{
        selectedProizvodID: number,
        selectedProizvod: Proizvod
    }>()
)

export const updateItemSuccess = createAction(
    "[Proizvod] Izmena proizvoda je uspesna",
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