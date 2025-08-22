import { createFeatureSelector, createSelector } from "@ngrx/store"
import { ToastState } from "./toast.reducer"

export const selectProizvodiFeature = createFeatureSelector<ToastState>('toast')

export const selectPoruka = createSelector(
    selectProizvodiFeature,
    (state: ToastState) => state.poruka
)

export const selectTipPoruke = createSelector(
    selectProizvodiFeature,
    (state: ToastState) => state.tipPoruke
)

export const selectPrikaz = createSelector(
    selectProizvodiFeature,
    (state: ToastState) => state.prikaziPoruku
)
