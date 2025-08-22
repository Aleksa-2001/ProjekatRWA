import { createReducer, on } from "@ngrx/store"
import * as ToastActions from "./toast.actions"

export interface ToastState {
    poruka: string
    tipPoruke: string | null,
    prikaziPoruku: boolean
}

const initialState: ToastState = {
    poruka: '',
    tipPoruke: null,
    prikaziPoruku: false
}

export const toastReducer = createReducer(
    initialState,
    on(ToastActions.showToast, (state, { poruka, tipPoruke }) => ({
        ...state,
        poruka,
        tipPoruke,
        prikaziPoruku: true
    })),
    on(ToastActions.hideToast, () => (initialState))
)