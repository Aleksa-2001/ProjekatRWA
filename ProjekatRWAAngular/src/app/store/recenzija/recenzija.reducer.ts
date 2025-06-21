import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { Recenzija } from "../../models/recenzija";
import { createReducer, on } from "@ngrx/store";
import * as RecenzijeActions from "./recenzija.actions"

export interface RecenzijeState extends EntityState<Recenzija> {
    selectedRecenzijaID: number,
    selectedRecenzija: Recenzija | null
}

const adapter = createEntityAdapter<Recenzija>();

const initialState: RecenzijeState = adapter.getInitialState({
    selectedRecenzijaID: -1,
    selectedRecenzija: null
})

export const recenzijaReducer = createReducer(
    initialState,
    on(RecenzijeActions.loadItemsSuccess, (state, {recenzije}) => 
        adapter.setAll(recenzije, state)
    ),
    on(RecenzijeActions.setSelectedItemID, (state, {recenzijaID}) => ({
        ...state,
        selectedRecenzijaID: recenzijaID
    })),
    on(RecenzijeActions.loadSelectedItemSuccess, (state, {selectedRecenzija}) => ({
        ...state,
        selectedRecenzija: selectedRecenzija
    })),
    on(RecenzijeActions.deselectSelectedItem, (state) => ({
        ...state,
        selectedRecenzijaID: -1,
        selectedRecenzija: null
    })),
    on(RecenzijeActions.addItemSuccess, (state, {recenzija}) => 
        adapter.addOne(recenzija, state)
    ),
    on(RecenzijeActions.updateItemSuccess, (state, {recenzija}) => (
        adapter.updateOne(recenzija, {
            ...state,
            selectedRecenzijaID: -1,
            selectedRecenzija: null
        })
    )),
    on(RecenzijeActions.deleteItemSuccess, (state, {recenzijaID}) => (
        adapter.removeOne(recenzijaID, {
            ...state,
            selectedRecenzijaID: -1,
            selectedRecenzija: null
        })
    ))
)