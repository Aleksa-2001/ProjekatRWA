import { createReducer, on } from "@ngrx/store";
import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { Prodavnica } from "../../models/prodavnica";
import * as ProdavniceActions from "./prodavnica.actions"

export interface ProdavniceState extends EntityState<Prodavnica> {
    loading: boolean
    selectedProdavnicaID: number
    selectedProdavnica: Prodavnica | null
    error: any
}

const adapter = createEntityAdapter<Prodavnica>();

const initialState: ProdavniceState = adapter.getInitialState({
    loading: true,
    selectedProdavnicaID: -1,
    selectedProdavnica: null,
    error: null
})

export const prodavnicaReducer = createReducer(
    initialState,
    on(ProdavniceActions.loadItems, (state) => ({
        ...state,
        loading: true,
        error: null
    })),
    on(ProdavniceActions.loadItemsSuccess, (state, {prodavnice}) => 
        adapter.setAll(prodavnice, {
            ...state,
            loading: false,
            error: null
        })
    ),
    on(ProdavniceActions.loadItemsFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),
    on(ProdavniceActions.setSelectedItemID, (state, {prodavnicaID}) => ({
        ...state,
        selectedProdavnicaID: prodavnicaID
    })),
    on(ProdavniceActions.loadSelectedItem, (state) => ({
        ...state,
        loading: true,
        error: null
    })),
    on(ProdavniceActions.loadSelectedItemSuccess, (state, {selectedProdavnica}) => ({
        ...state,
        loading: false,
        selectedProdavnica: selectedProdavnica,
        error: null
    })),
    on(ProdavniceActions.loadSelectedItemFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),
    on(ProdavniceActions.deselectSelectedItem, (state) => ({
        ...state,
        selectedProdavnicaID: -1,
        selectedProdavnica: null
    })),
    on(ProdavniceActions.addItemSuccess, (state, {prodavnica}) => 
        adapter.addOne(prodavnica, state)
    ),
    on(ProdavniceActions.addItemFailure, (state, { error }) => ({
        ...state,
        error
    })),
    on(ProdavniceActions.updateItemSuccess, (state, {prodavnica, selectedProdavnica}) => (
        adapter.updateOne(prodavnica, {
            ...state,
            selectedProdavnica: selectedProdavnica
        })
    )),
    on(ProdavniceActions.updateItemFailure, (state, { error }) => ({
        ...state,
        error
    })),
    on(ProdavniceActions.deleteItemSuccess, (state, {prodavnicaID}) => (
        adapter.removeOne(prodavnicaID, {
            ...state,
            selectedProdavnicaID: -1,
            selectedProdavnica: null
        })
    )),
    on(ProdavniceActions.deleteItemFailure, (state, {    error }) => ({
        ...state,
        error
    })),
    on(ProdavniceActions.updatePathSuccess, (state, {prodavnica, selectedProdavnica}) => (
        adapter.updateOne(prodavnica, {
            ...state,
            selectedProdavnica: selectedProdavnica
        })
    ))
)