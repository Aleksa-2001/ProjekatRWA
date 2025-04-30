import { AuthState } from "./auth/auth.reducer";
import { ProizvodiState } from "./proizvod/proizvod.reducer";
import { ProdavniceState } from "./prodavnica/prodavnica.reducer";

export interface AppState {
    auth: AuthState
    prodavnice: ProdavniceState
    proizvodi: ProizvodiState
}