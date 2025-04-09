import { Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { RacunarskaKomponentaService } from "../services/RacunarskaKomponenta.service"
import * as KomponenteActions from "./komponente.actions"
import { of } from "rxjs"
import { catchError, map, mergeMap } from "rxjs/operators"

@Injectable()
export class KomponenteEffect {
    constructor(private service: RacunarskaKomponentaService, private actions$: Actions) { }

    loadEffect$ = createEffect(() => 
        this.actions$.pipe(
            ofType(KomponenteActions.loadItems),
            mergeMap(() => this.service.getKomponente()
                .pipe(
                    map((komponente) => (KomponenteActions.loadItemsSuccess({komponente}))),
                    catchError(() => of({ type: "Load error" }))
                )
            )
        )
    )
}