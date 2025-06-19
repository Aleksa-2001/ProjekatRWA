import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { Recenzija } from "../../models/recenzija";
import { createReducer, on } from "@ngrx/store";
import * as RecenzijeActions from "./recenzija.actions"

export interface RecenzijeState extends EntityState<Recenzija> { }

const adapter = createEntityAdapter<Recenzija>();

const initialState: RecenzijeState = adapter.getInitialState({})

export const recenzijaReducer = createReducer(
    initialState,
    on(RecenzijeActions.loadItemsSuccess, (state, {recenzije}) => 
        adapter.setAll(recenzije, state)
    )
)