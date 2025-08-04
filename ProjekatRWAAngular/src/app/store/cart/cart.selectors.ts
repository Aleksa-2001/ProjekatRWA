import { createFeatureSelector, createSelector } from "@ngrx/store"
import { Artikal, CartState } from "./cart.reducer"

export const selectCartFeature = createFeatureSelector<CartState>('cart')

export const selectLoading = createSelector(
    selectCartFeature,
    (state: CartState) => state.loading
)

export const selectCart = createSelector(
    selectCartFeature,
    (state: CartState) => state.artikli
)

export const selectItemCount = createSelector(
    selectCart,
    (artikli: Artikal[]) => artikli.length
)