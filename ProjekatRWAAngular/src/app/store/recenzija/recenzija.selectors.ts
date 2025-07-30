import { createFeatureSelector, createSelector } from "@ngrx/store"
import { RecenzijeState } from "./recenzija.reducer"
import { Recenzija } from "../../models/recenzija"
import { selectUser } from "../auth/auth.selectors"
import { User } from "../../models/user"

export const selectRecenzijeFeature = createFeatureSelector<RecenzijeState>('recenzije')

export const selectLoading = createSelector(
    selectRecenzijeFeature,
    (state: RecenzijeState) => state.loading
)

export const selectRecenzije = createSelector(
    selectRecenzijeFeature,
    (state: RecenzijeState) => Object
        .values(state.entities)
        .filter(recenzija => !!recenzija)
        .map(recenzija => <Recenzija>recenzija)
)

export const selectSelectedRecenzijaID = createSelector(
    selectRecenzijeFeature,
    (state: RecenzijeState) => state.selectedRecenzijaID
)

export const selectSelectedRecenzija = createSelector(
    selectRecenzijeFeature,
    (state: RecenzijeState) => state.selectedRecenzija
)

export const selectUnetaRecenzija = createSelector(
    selectRecenzije,
    selectUser,
    (recenzije: Recenzija[], user: User | null) => recenzije.find(r => r.user.userID === user?.userID) ? true : false
)

export const selectError = createSelector(
    selectRecenzijeFeature,
    (state: RecenzijeState) => state.error
)