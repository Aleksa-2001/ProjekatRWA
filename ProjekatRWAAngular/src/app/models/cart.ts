import { Artikal } from "../store/cart/cart.reducer";

export class Cart {

    constructor(
        public artikli: Artikal[]
    ) {
        artikli = []
    }

}