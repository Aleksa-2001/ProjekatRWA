import { createReducer, on } from "@ngrx/store";
import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { Prodavnica } from "../../models/prodavnica";
import * as ProdavniceActions from "./prodavnica.actions"

export interface ProdavniceState extends EntityState<Prodavnica> {
    selectedProdavnicaID: number
    selectedProdavnica: Prodavnica | null
}

const adapter = createEntityAdapter<Prodavnica>();

const initialState: ProdavniceState = adapter.getInitialState({
    selectedProdavnicaID: -1,
    selectedProdavnica: null
})

export const prodavnicaReducer = createReducer(
    initialState,
    on(ProdavniceActions.loadItemsSuccess, (state, {prodavnice}) => 
        adapter.setAll(prodavnice, state)
    ),
    on(ProdavniceActions.setSelectedItemID, (state, {prodavnicaID}) => ({
        ...state,
        selectedProdavnicaID: prodavnicaID
    })),
    on(ProdavniceActions.loadSelectedItemSuccess, (state, {selectedProdavnica}) => ({
        ...state,
        selectedProdavnica: selectedProdavnica
    })),
    on(ProdavniceActions.deselectSelectedItem, (state) => ({
        ...state,
        selectedProdavnicaID: -1,
        selectedProdavnica: null
    })),
    on(ProdavniceActions.addItemSuccess, (state, {prodavnica}) => 
        adapter.addOne(prodavnica, state)
    ),
    on(ProdavniceActions.updateItemSuccess, (state, {prodavnica, selectedProdavnica}) => (
        adapter.updateOne(prodavnica, {
            ...state,
            selectedProdavnica: selectedProdavnica
        })
    )),
    on(ProdavniceActions.deleteItemSuccess, (state, {prodavnicaID}) => (
        adapter.removeOne(prodavnicaID, {
            ...state,
            selectedProdavnicaID: -1,
            selectedProdavnica: null
        })
    )),
    on(ProdavniceActions.updatePathSucces, (state, {prodavnica, selectedProdavnica}) => (
        adapter.updateOne(prodavnica, {
            ...state,
            selectedProdavnica: selectedProdavnica
        })
    ))
)