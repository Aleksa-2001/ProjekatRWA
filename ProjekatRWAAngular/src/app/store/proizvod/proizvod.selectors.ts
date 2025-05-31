import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProizvodiState } from "./proizvod.reducer";
import { Proizvod } from "../../models/proizvod";
import { AppState } from "../app-state";

// export const selectComponentsFeature = createSelector(
//     (state: AppState) => state.komponente,
//     (components) => components
// )

export const selectProizvodiFeature = createFeatureSelector<ProizvodiState>('proizvodi')

export const selectProizvodi = createSelector(
    selectProizvodiFeature,
    //(state: KomponenteState) => state.entities
    (state: ProizvodiState) => Object
        .values(state.entities)
        .filter(component => component != null)
        .map(component => <Proizvod>component)
)

export const selectSelectedProizvodID = createSelector(
    selectProizvodiFeature,
    (state: ProizvodiState) => state.selectedProizvodID
)

export const selectSelectedProizvod = createSelector(
    selectProizvodiFeature,
    (state: ProizvodiState) => state.selectedProizvod
)