import { createFeatureSelector, createSelector } from "@ngrx/store"
import { RecenzijeState } from "./recenzija.reducer"
import { Recenzija } from "../../models/recenzija"

export const selectRecenzijeFeature = createFeatureSelector<RecenzijeState>('recenzije')

export const selectRecenzije = createSelector(
    selectRecenzijeFeature,
    (state: RecenzijeState) => Object
        .values(state.entities)
        .filter(recenzija => !!recenzija)
        .map(recenzija => <Recenzija>recenzija)
)
