import { createReducer, on } from "@ngrx/store"
import { EntityState, createEntityAdapter } from '@ngrx/entity';
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
    on(ProizvodiActions.updateItemSuccess, (state, {selectedProizvod}) => ({
        ...state,
        selectedProizvod: selectedProizvod
    }))
    //on(KomponenteActions.setItem, (state, {komponentaID}) => {
    //    const targetKomponenta = state.entities[komponentaID]
    //    if (targetKomponenta) {
    //        return adapter.setOne({...targetKomponenta}, state)
    //    }
    //    else {
    //        return state
    //    }
    //})
)