import { createReducer, on } from "@ngrx/store"
import { EntityState, Update, createEntityAdapter } from '@ngrx/entity';
import { Proizvod } from "../../models/proizvod";
import * as ProizvodiActions from "./proizvod.actions"

export interface ProizvodiState extends EntityState<Proizvod> {
    selectedProizvodID: number,
    selectedProizvod: Proizvod | null
}

const adapter = createEntityAdapter<Proizvod>();

const initialState: ProizvodiState = adapter.getInitialState({
    selectedProizvodID: -1,
    selectedProizvod: null
})

export const proizvodReducer = createReducer(
    initialState,
    /*on(KomponenteActions.loadItems, (state, {komponente}) => ({
        ...state,
        allComponents: komponente
    })),*/
    on(ProizvodiActions.loadItemsSuccess, (state, {proizvodi}) => 
        adapter.setAll(proizvodi, state)
    ),
    on(ProizvodiActions.setSelectedItemID, (state, {proizvodID}) => ({
        ...state,
        selectedProizvodID: proizvodID
    })),
    on(ProizvodiActions.loadSelectedItemSuccess, (state, {selectedProizvod}) => ({
        ...state,
        selectedProizvod: selectedProizvod
    })),
    on(ProizvodiActions.deselectSelectedItem, (state) => ({
        ...state,
        selectedProizvodID: -1,
        selectedProizvod: null
    })),
    on(ProizvodiActions.addItemSuccess, (state, {proizvod}) => 
        adapter.addOne(proizvod, state)
    ),
    on(ProizvodiActions.updateItemSuccess, (state, {proizvod, selectedProizvod}) => (
        adapter.updateOne(proizvod, {
            ...state,
            selectedProizvod: selectedProizvod
        })
    )),
    on(ProizvodiActions.deleteItemSuccess, (state, {proizvodID}) => (
        adapter.removeOne(proizvodID, {
            ...state,
            selectedProizvodID: -1,
            selectedProizvod: null
        })
    )),
    on(ProizvodiActions.deleteAllItemsSuccess, (state/*, {proizvodi}*/) => (
        //adapter.removeMany(proizvodi.map(proizvod => proizvod.id), state)
        adapter.removeAll(state)
    )),
    on(ProizvodiActions.updatePathSucces, (state, {proizvod, selectedProizvod}) => (
        adapter.updateOne(proizvod, {
            ...state,
            selectedProizvod: selectedProizvod
        })
    ))
)