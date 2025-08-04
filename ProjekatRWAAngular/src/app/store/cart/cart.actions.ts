import { createAction, props } from "@ngrx/store"

export const loadItems = createAction(
    "[Korpa] Ucitaj listu"
)

export const loadItemsSuccess = createAction(
    "[Korpa] Ucitavanje liste je uspesno",
    props<{
        korpa: any[]
    }>()
)

export const loadItemsFailure = createAction(
    "[Korpa] Greska pri ucitavanju liste artikala",
    props<{
        error: any
    }>()
)