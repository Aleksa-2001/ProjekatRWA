import { AuthState } from "./auth/auth.reducer";
import { KomponenteState } from "./komponenta/komponenta.reducer";
import { ProdavniceState } from "./prodavnica/prodavnica.reducer";

export interface AppState {
    auth: AuthState
    prodavnice: ProdavniceState
    komponente: KomponenteState
}