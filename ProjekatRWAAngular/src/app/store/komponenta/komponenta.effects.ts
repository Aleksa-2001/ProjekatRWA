import { inject, Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { RacunarskaKomponentaService } from "../../services/racunarska-komponenta.service"
import * as KomponenteActions from "./komponenta.actions"
import { of } from "rxjs"
import { catchError, map, mergeMap } from "rxjs/operators"

@Injectable()
export class KomponenteEffects {
    private actions$ = inject(Actions);
    private service = inject(RacunarskaKomponentaService);

    //constructor(private service: RacunarskaKomponentaService, private actions$: Actions) { }

    loadEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(KomponenteActions.loadItems),
            mergeMap(() => this.service.getKomponente()
                .pipe(
                    map((komponente) => (KomponenteActions.loadItemsSuccess({komponente}))),
                    catchError(() => of({ type: "Load error" }))
                )
            )
        )
    })
}