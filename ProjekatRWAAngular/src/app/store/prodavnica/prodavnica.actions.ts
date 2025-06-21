import { createAction, props } from "@ngrx/store";
import { Prodavnica } from "../../models/prodavnica";
import { Update } from "@ngrx/entity";

export const loadItems = createAction(
    "[Prodavnica] Ucitaj listu"
)

export const loadItemsBySearch = createAction(
    "[Prodavnica] Ucitaj listu putem pretrage",
    props<{
        search: string
    }>()
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

export const loadSelectedItemSuccess = createAction(
    "[Prodavnica] Ucitavanje prodavnice je uspesno",
    props<{
        selectedProdavnica: Prodavnica
    }>()
)

export const deselectSelectedItem = createAction(
    "[Prodavnica] Deselektuj prodavnicu"
)

export const addItem = createAction(
    "[Prodavnica] Dodaj prodavnicu",
    props<{
        prodavnica: Prodavnica,
        file?: FormData
    }>()
)

export const addItemSuccess = createAction(
    "[Prodavnica] Dodavanje prodavnice je uspesno",
    props<{
        prodavnica: Prodavnica,
        file?: FormData
    }>()
)

export const updateItem = createAction(
    "[Prodavnica] Izmeni prodavnicu",
    props<{
        selectedProdavnicaID: number,
        selectedProdavnica: Prodavnica
        file?: FormData
    }>()
)

export const updateItemSuccess = createAction(
    "[Prodavnica] Izmena prodavnice je uspesna",
    props<{
        prodavnica: Update<Prodavnica>
        selectedProdavnica: Prodavnica
        file?: FormData
    }>()
)

export const deleteItem = createAction(
    "[Prodavnica] Obrisi prodavnicu",
    props<{
        selectedProdavnicaID: number
    }>()
)

export const deleteItemSuccess = createAction(
    "[Prodavnica] Prodavnica uspesno obrisana",
    props<{
        prodavnicaID: number
    }>()
)

export const uploadImageSuccess = createAction(
    "[Prodavnica] Slika uspesno uneta",
    props<{
        prodavnicaID: number
        path: string
    }>()
)

export const uploadImageIgnore = createAction(
    "[Prodavnica] Slika nije prosledjena"
)

export const updatePathSucces = createAction(
    "[Prodavnica] Azuriranje putanje uspesno",
    props<{
        prodavnica: Update<Prodavnica>
        selectedProdavnica: Prodavnica
    }>()
)