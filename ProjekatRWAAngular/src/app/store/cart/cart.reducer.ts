import { Proizvod } from "../../models/proizvod"
import { createReducer, on } from "@ngrx/store"
import * as CartActions from "./cart.actions"

export type Artikal = { proizvod: Proizvod, kolicina: number }

export interface CartState {
    artikli: Artikal[]
    loading: boolean
    error: any
}

export const initialState: CartState = {
    artikli: [],
    loading: true,
    error: null
}

export const cartReducer = createReducer(
    initialState,
    on(CartActions.loadItems, (state) => {
        const cart = localStorage.getItem('cart')

        return {
            ...state,
            artikli: cart ? JSON.parse(cart).artikli : [],
            loading: false,
            error: null
        }
    }),
    on(CartActions.addToCart, (state, { proizvod }) => {
        const existingItem = state.artikli.find(
            artikal => artikal.proizvod.id === proizvod.id
        )

        if (existingItem) {
            return {
                ...state,
                artikli: state.artikli.map(artikal =>
                    artikal.proizvod.id === proizvod.id
                    ? { ...artikal, kolicina: artikal.kolicina + 1 }
                    : artikal
                )
            }
        }

        const noviArtikal: Artikal = { proizvod, kolicina: 1 }

        return {
            ...state,
            artikli: [...state.artikli, noviArtikal]
        }
    }),
    on(CartActions.removeFromCart, (state, { proizvod }) => {
        return state
    }),
    on(CartActions.clearCart, (state) => {
        localStorage.removeItem('cart')

        return {
            ...state,
            artikli: []
        }
    })
)