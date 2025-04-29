import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProdavniceState } from "./prodavnica.reducer";
import { Prodavnica } from "../../models/prodavnica";
import { AppState } from "../app-state";

export const selectProdavniceFeature = createSelector(
    (state: AppState) => state.prodavnice,
    (components) => components
)

//export const selectProdavniceFeature = createFeatureSelector<ProdavniceState>('prodavnice');

export const selectProdavnice = createSelector(
    selectProdavniceFeature,
    (state: ProdavniceState) => Object
        .values(state.entities)
        .filter(prodavnica => prodavnica != null)
        .map(prodavnica => <Prodavnica>prodavnica)
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