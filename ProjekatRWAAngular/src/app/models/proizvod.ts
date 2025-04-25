import { Racunar } from "./racunar";
import { RacunarskaKomponenta } from "./komponente/racunarska-komponenta";

export class Proizvod {

    constructor(public id: number, public proizvod: Racunar | RacunarskaKomponenta, public cena: number) {
        id = 0
        proizvod
        cena = 0
    }
}