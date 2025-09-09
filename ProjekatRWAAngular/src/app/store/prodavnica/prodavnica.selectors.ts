import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProdavniceState } from "./prodavnica.reducer";
import { Prodavnica } from "../../models/prodavnica";

export const selectProdavniceFeature = createFeatureSelector<ProdavniceState>('prodavnice')

export const selectLoading = createSelector(
    selectProdavniceFeature,
    (state: ProdavniceState) => state.loading
)

export const selectProdavnice = createSelector(
    selectProdavniceFeature,
    (state: ProdavniceState) => Object
        .values(state.entities)
        .filter(prodavnica => !!prodavnica)
        .map(prodavnica => <Prodavnica>prodavnica)
)

export const selectBrojProdavnica = createSelector(
    selectProdavnice,
    (prodavnice) => prodavnice.length
)
    
export const selectSelectedProdavnicaID = createSelector(
    selectProdavniceFeature,
    (state: ProdavniceState) => state.selectedProdavnicaID
)

export const selectSelectedProdavnica = createSelector(
    //selectProdavnice,
    //selectSelectedProdavnicaID,
    //(prodavnice, selectedProdavnicaID) => prodavnice.find(prodavnica => prodavnica.id == selectedProdavnicaID) ?? null
    selectProdavniceFeature,
    (state: ProdavniceState) => state.selectedProdavnica
)

export const selectNaziviProdavnica = createSelector(
    selectProdavnice,
    (prodavnice) => [...new Set(prodavnice.map(prodavnica => prodavnica.naziv))].sort((a, b) => a.toLowerCase() < b.toLowerCase() ? -1 : 1)
)

export const selectGradovi = createSelector(
    selectProdavnice,
    (prodavnice) => [...new Set(prodavnice.map(prodavnica => prodavnica.grad))].sort((a, b) => a.toLowerCase() < b.toLowerCase() ? -1 : 1)
)

export const selectError = createSelector(
    selectProdavniceFeature,
    (state: ProdavniceState) => state.error
)