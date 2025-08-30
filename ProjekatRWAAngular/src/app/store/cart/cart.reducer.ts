import { Proizvod } from "../../models/proizvod"
import { createReducer, on } from "@ngrx/store"
import * as CartActions from "./cart.actions"

export type Artikal = { proizvod: Proizvod, kolicina: number }

export const maxKolicina = 50

export interface CartState {
    artikli: Artikal[]
}

export const initialState: CartState = {
    artikli: []
}

export const cartReducer = createReducer(
    initialState,
    on(CartActions.loadItems, (state) => {
        const cart = localStorage.getItem('cart')

        return {
            ...state,
            artikli: cart ? JSON.parse(cart).artikli : []
        }
    }),
    on(CartActions.addToCartSuccess, (state, { proizvod }) => {
        const existingItem = state.artikli.find(
            artikal => artikal.proizvod.id === proizvod.id
        )

        if (existingItem) {
            return {
                ...state,
                artikli: state.artikli.map(artikal =>
                    artikal.proizvod.id === proizvod.id
                    ? { ...artikal, kolicina: artikal.kolicina < maxKolicina ? artikal.kolicina + 1: artikal.kolicina }
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
    on(CartActions.increaseAmount, (state, { artikal }) => {
        if (state.artikli.includes(artikal)) {
            return {
                ...state,
                artikli: state.artikli.map(a =>
                    a === artikal
                    ? { ...a, kolicina: a.kolicina < maxKolicina ? a.kolicina + 1 : a.kolicina }
                    : a
                )
            }
        }
        else return state
    }),
    on(CartActions.decreaseAmount, (state, { artikal }) => {
        if (state.artikli.includes(artikal)) {
            return {
                ...state,
                artikli: state.artikli.map(a =>
                    a === artikal
                    ? { ...a, kolicina: a.kolicina > 1 ? a.kolicina - 1 : a.kolicina }
                    : a
                )
            }
        }
        else return state
    }),
    on(CartActions.removeFromCart, (state, { artikal }) => {
        if (state.artikli.includes(artikal)) {
            return {
                ...state,
                artikli: state.artikli.filter(a => a !== artikal)
            }
        }
        else return state
    }),
    on(CartActions.clearCart, (state) => {
        localStorage.removeItem('cart')

        return {
            ...state,
            artikli: []
        }
    }),
    on(CartActions.createOrder, (state) => {
        localStorage.removeItem('cart')

        return {
            ...state,
            artikli: []
        }
    })
)