import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { Prodavnica } from "../../models/prodavnica";
import { createReducer, on } from "@ngrx/store";
import * as ProdavniceActions from "./prodavnica.actions"

export interface ProdavniceState extends EntityState<Prodavnica> {
    selectedProdavnicaID: number
}

const adapter = createEntityAdapter<Prodavnica>();

const initialState: ProdavniceState = adapter.getInitialState({
    selectedProdavnicaID: -1
})

export const prodavnicaReducer = createReducer(
    initialState,
    on(ProdavniceActions.loadItemsSuccess, (state, {prodavnice}) => 
        adapter.setAll(prodavnice, state)
    ),
    on(ProdavniceActions.setSelectedItemID, (state, {prodavnicaID}) => ({
        ...state,
        selectedProdavnicaID: prodavnicaID
    }))
)