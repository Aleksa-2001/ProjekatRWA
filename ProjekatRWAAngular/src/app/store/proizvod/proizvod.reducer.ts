import { createReducer, on } from "@ngrx/store"
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Proizvod } from "../../models/proizvod";
import * as ProizvodiActions from "./proizvod.actions"

export interface ProizvodiState extends EntityState<Proizvod> {
    loading: boolean
    selectedProizvodID: number
    selectedProizvod: Proizvod | null
    error: any
}

const adapter = createEntityAdapter<Proizvod>();

const initialState: ProizvodiState = adapter.getInitialState({
    loading: true,
    selectedProizvodID: -1,
    selectedProizvod: null,
    error: null
})

export const proizvodReducer = createReducer(
    initialState,
    on(ProizvodiActions.loadItems, ProizvodiActions.loadItemsBySearch, (state) => ({
        ...state,
        loading: true,
        error: null
    })),
    on(ProizvodiActions.loadItemsSuccess, (state, { proizvodi }) => 
        adapter.setAll(proizvodi, {
            ...state,
            loading: false,
            error: null
        })
    ),
    on(ProizvodiActions.loadItemsFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),
    on(ProizvodiActions.setSelectedItemID, (state, { proizvodID }) => ({
        ...state,
        selectedProizvodID: proizvodID
    })),
    on(ProizvodiActions.loadSelectedItem, (state) => ({
        ...state,
        loading: true,
        error: null
    })),
    on(ProizvodiActions.loadSelectedItemSuccess, (state, { selectedProizvod }) => ({
        ...state,
        loading: false,
        selectedProizvod: selectedProizvod,
        error: null
    })),
    on(ProizvodiActions.loadSelectedItemFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),
    on(ProizvodiActions.deselectSelectedItem, (state) => ({
        ...state,
        selectedProizvodID: -1,
        selectedProizvod: null
    })),
    on(ProizvodiActions.addItemSuccess, (state, { proizvod }) => 
        adapter.addOne(proizvod, state)
    ),
    on(ProizvodiActions.addItemFailure, (state, { error }) => ({
        ...state,
        error
    })),
    on(ProizvodiActions.updateItemSuccess, ProizvodiActions.updateRacunarSuccess, (state, { proizvod, selectedProizvod }) => (
        adapter.updateOne(proizvod, {
            ...state,
            selectedProizvod: selectedProizvod
        })
    )),
    on(ProizvodiActions.updateItemFailure, ProizvodiActions.updateRacunarFailure, (state, { error }) => ({
        ...state,
        error
    })),
    on(ProizvodiActions.deleteItemSuccess, (state, { proizvodID }) => (
        adapter.removeOne(proizvodID, {
            ...state,
            selectedProizvodID: -1,
            selectedProizvod: null
        })
    )),
    on(ProizvodiActions.deleteItemFailure, (state, { error }) => ({
        ...state,
        error
    })),
    on(ProizvodiActions.deleteAllItemsSuccess, (state/*, { proizvodi }*/) => (
        //adapter.removeMany(proizvodi.map(proizvod => proizvod.id), state)
        adapter.removeAll(state)
    )),
    on(ProizvodiActions.updatePathSuccess, (state, { proizvod, selectedProizvod }) => (
        adapter.updateOne(proizvod, {
            ...state,
            selectedProizvod: selectedProizvod
        })
    ))
)