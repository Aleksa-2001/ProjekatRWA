import { createReducer, on } from "@ngrx/store"
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { RacunarskaKomponenta } from "../../models/komponente/racunarska-komponenta"
import * as KomponenteActions from "./komponenta.actions"

export interface KomponenteState extends EntityState<RacunarskaKomponenta> {
    selectedComponentID: number
}

const adapter = createEntityAdapter<RacunarskaKomponenta>();

const initiasState: KomponenteState = adapter.getInitialState({
    selectedComponentID: -1
})

export const komponentaReducer = createReducer(
    initiasState,
    /*on(KomponenteActions.loadItems, (state, {komponente}) => ({
        ...state,
        allComponents: komponente
    })),*/
    on(KomponenteActions.loadItemsSuccess, (state, {komponente}) => 
        adapter.setAll(komponente, state)
    ),
    on(KomponenteActions.setItem, (state, {komponentaID}) => {
        const targetKomponenta = state.entities[komponentaID]
        if (targetKomponenta) {
            return adapter.setOne({...targetKomponenta}, state)
        }
        else {
            return state
        }
    })
)