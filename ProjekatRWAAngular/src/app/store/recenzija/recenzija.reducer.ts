import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { Recenzija } from "../../models/recenzija";
import { createReducer, on } from "@ngrx/store";
import * as RecenzijeActions from "./recenzija.actions"

export interface RecenzijeState extends EntityState<Recenzija> {
    loading: boolean
    selectedRecenzijaID: number
    selectedRecenzija: Recenzija | null
    error: any
}

const adapter = createEntityAdapter<Recenzija>();

const initialState: RecenzijeState = adapter.getInitialState({
    loading: true,
    selectedRecenzijaID: -1,
    selectedRecenzija: null,
    error: null
})

export const recenzijaReducer = createReducer(
    initialState,
    on(RecenzijeActions.loadItemsUser, RecenzijeActions.loadItemsProdavnica, RecenzijeActions.loadItemsProizvod, (state) => ({
        ...state,
        loading: true,
        error: null
    })),
    on(RecenzijeActions.loadItemsSuccess, (state, { recenzije }) => 
        adapter.setAll(recenzije, {
            ...state,
            loading: false,
            error: null
        })
    ),
    on(RecenzijeActions.loadItemsFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),
    on(RecenzijeActions.setSelectedItemID, (state, { recenzijaID }) => ({
        ...state,
        selectedRecenzijaID: recenzijaID
    })),
    on(RecenzijeActions.loadSelectedItem, (state) => ({
        ...state,
        loading: true,
        error: null
    })),
    on(RecenzijeActions.loadSelectedItemSuccess, (state, { selectedRecenzija }) => ({
        ...state,
        loading: false,
        selectedRecenzija: selectedRecenzija,
        error: null
    })),
    on(RecenzijeActions.loadSelectedItemFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),
    on(RecenzijeActions.deselectSelectedItem, (state) => ({
        ...state,
        selectedRecenzijaID: -1,
        selectedRecenzija: null
    })),
    on(RecenzijeActions.addItemSuccess, (state, { recenzija }) => 
        adapter.addOne(recenzija, state)
    ),
    on(RecenzijeActions.addItemFailure, (state, { error }) => ({
        ...state,
        error
    })),
    on(RecenzijeActions.updateItemSuccess, (state, { recenzija }) => (
        adapter.updateOne(recenzija, {
            ...state,
            selectedRecenzijaID: -1,
            selectedRecenzija: null
        })
    )),
    on(RecenzijeActions.updateItemFailure, (state, { error }) => ({
        ...state,
        error
    })),
    on(RecenzijeActions.deleteItemSuccess, (state, { recenzijaID }) => (
        adapter.removeOne(recenzijaID, {
            ...state,
            selectedRecenzijaID: -1,
            selectedRecenzija: null
        })
    )),
    on(RecenzijeActions.deleteItemFailure, (state, { error }) => ({
        ...state,
        error
    })),
)