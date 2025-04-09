import { createSelector } from "@ngrx/store";
import { AppState } from "./app-state";
import { KomponenteState } from "./komponente.reducer";
import { RacunarskaKomponenta } from "../models/racunarskaKomponenta";

export const selectComponentsFeature = createSelector(
    (state: AppState) => state.components,
    (components) => components
)

export const selectAllComponents = createSelector(
    selectComponentsFeature,
    //(state: KomponenteState) => state.entities
    (state: KomponenteState) => Object
        .values(state.entities)
        .filter(component => component != null)
        .map(component => <RacunarskaKomponenta>component)
)

export const selectSelectedComponentID = createSelector(
    selectComponentsFeature,
    (state: KomponenteState) => state.selectedComponentID
)

export const selectSelectedComponent = createSelector(
    selectAllComponents,
    selectSelectedComponentID,
    //(components, selectedComponentID) => components[selectedComponentID] ?? null
    (components, selectedComponentID) => components.find(component => component.id == selectedComponentID) ?? null
)