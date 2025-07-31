import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProizvodiState } from "./proizvod.reducer";
import { Proizvod } from "../../models/proizvod";
import { AppState } from "../app-state";

// export const selectComponentsFeature = createSelector(
//     (state: AppState) => state.komponente,
//     (components) => components
// )

export const selectProizvodiFeature = createFeatureSelector<ProizvodiState>('proizvodi')

export const selectLoading = createSelector(
    selectProizvodiFeature,
    (state: ProizvodiState) => state.loading
)

export const selectProizvodi = createSelector(
    selectProizvodiFeature,
    //(state: KomponenteState) => state.entities
    (state: ProizvodiState) => Object
        .values(state.entities)
        .filter(proizvod => !!proizvod)
        .map(proizvod => <Proizvod>proizvod)
)

export const selectBrojProizvoda = createSelector(
    selectProizvodi,
    (proizvodi) => proizvodi.length
)

export const selectSelectedProizvodID = createSelector(
    selectProizvodiFeature,
    (state: ProizvodiState) => state.selectedProizvodID
)

export const selectSelectedProizvod = createSelector(
    selectProizvodiFeature,
    (state: ProizvodiState) => state.selectedProizvod
)

export const selectCenaRange = createSelector(
    selectProizvodi,
    (proizvodi) => {
        const ceneProizvoda = proizvodi.map(proizvod => proizvod.cena)
        const minCena = Math.min(...ceneProizvoda)
        const maxCena = Math.max(...ceneProizvoda)
        return { min: minCena, max: maxCena }
    }
)

export const selectTipoviProizvoda = createSelector(
    selectProizvodi,
    (proizvodi) => [...new Set(proizvodi.map(proizvod => proizvod.tipProizvoda))].sort((a, b) => a.toLowerCase() < b.toLowerCase() ? -1 : 1)
)

export const selectType = createSelector(
    selectProizvodi,
    (proizvodi) => [...new Set(proizvodi.map(proizvod => proizvod.type))]
        .filter(proizvod => proizvod !== "Racunar")
        .sort((a, b) => a.toLowerCase() < b.toLowerCase() ? -1 : 1)
)

export const selectProizvodjaci = createSelector(
    selectProizvodi,
    (proizvodi) => [...new Set(proizvodi.map(proizvod => proizvod.proizvodjac))].sort((a, b) => a.toLowerCase() < b.toLowerCase() ? -1 : 1)
)

export const selectError = createSelector(
    selectProizvodiFeature,
    (state: ProizvodiState) => state.error
)