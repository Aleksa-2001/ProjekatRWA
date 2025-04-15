import { AuthState } from "./auth/auth.reducer";
import { KomponenteState } from "./komponenta/komponenta.reducer";

export interface AppState {
    auth: AuthState
    komponente: KomponenteState
}