import { createAction, props } from "@ngrx/store";
import { Proizvod } from "../../models/proizvod";
import { Update } from "@ngrx/entity";
import { Racunar } from "../../models/racunar";

export const loadItems = createAction(
    "[Proizvod] Ucitaj listu",
    props<{
        prodavnicaID: number
    }>()
)

export const loadItemsBySearch = createAction(
    "[Proizvod] Ucitaj listu putem pretrage",
    props<{
        search: string
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
        proizvod: Proizvod,
        file?: FormData
    }>()
)

export const addItemSuccess = createAction(
    "[Proizvod] Dodavanje proizvoda je uspesno",
    props<{
        proizvod: Proizvod
        file?: FormData
    }>()
)

export const updateItem = createAction(
    "[Proizvod] Izmeni proizvod",
    props<{
        selectedProizvodID: number,
        selectedProizvod: Proizvod,
        file?: FormData,
        selectMode?: boolean
    }>()
)

export const updateItemSuccess = createAction(
    "[Proizvod] Izmena proizvoda je uspesna",
    props<{
        proizvod: Update<Proizvod>,
        selectedProizvod: Proizvod,
        file?: FormData
    }>()
)

export const updateRacunar = createAction(
    "[Proizvod] Izmeni racunar",
    props<{
        selectedProizvodID: number,
        selectedProizvod: Racunar
    }>()
)

export const updateRacunarSuccess = createAction(
    "[Proizvod] Izmena racunara je uspesna",
    props<{
        proizvod: Update<Racunar>,
        selectedProizvod: Racunar
    }>()
)

export const deleteItem = createAction(
    "[Proizvod] Obrisi proizvod",
    props<{
        selectedProizvodID: number
    }>()
)

export const deleteItemSuccess = createAction(
    "[Proizvod] Proizvod uspesno obrisan",
    props<{
        proizvodID: number
    }>()
)

export const deleteAllItems = createAction(
    "[Proizvod] Obrisi sve proizvode",
    props<{
        prodavnicaID: number
    }>()
)

export const deleteAllItemsSuccess = createAction(
    "[Proizvod] Proizvodi uspesno obrisani",
    props<{
        proizvodi: Proizvod[]
    }>()
)

export const uploadImageSuccess = createAction(
    "[Proizvod] Slika uspesno uneta",
    props<{
        proizvodID: number
        path: string
    }>()
)

export const uploadImageIgnore = createAction(
    "[Proizvod] Slika nije prosledjena"
)

export const updatePathSucces = createAction(
    "[Proizvod] Azuriranje putanje uspesno",
    props<{
        proizvod: Update<Proizvod>
        selectedProizvod: Proizvod
    }>()
)