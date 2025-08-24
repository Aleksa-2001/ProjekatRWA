import { createFeatureSelector, createSelector } from "@ngrx/store"
import { Artikal, CartState } from "./cart.reducer"
import { Proizvod } from "../../models/proizvod"

export const selectCartFeature = createFeatureSelector<CartState>('cart')

export const selectCart = createSelector(
    selectCartFeature,
    (state: CartState) => state.artikli
)

export const selectTotalItemCount = createSelector(
    selectCart,
    (artikli: Artikal[]) => {
        const kolicine = artikli.map(artikal => artikal.kolicina)
        return kolicine.length ? kolicine.reduce((acc, kol) => acc += kol) : 0
    }
)

export const selectItemCount = (proizvod: Proizvod) => createSelector(
    selectCart,
    (artikli: Artikal[]) => {
        const artikal = artikli.find(artikal => artikal.proizvod.id === proizvod.id)
        return artikal ? artikal.kolicina : 0
    }
)

export const selectUkupnaCena = createSelector(
    selectCart,
    (artikli: Artikal[]) => { 
        const ceneArtikala = artikli.map(artikal => artikal.proizvod.cena * artikal.kolicina)
        return ceneArtikala.length ? ceneArtikala.reduce((acc, cena) => acc += cena) : 0
    }
)
