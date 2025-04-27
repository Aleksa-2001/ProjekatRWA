import { inject, Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { ProdavnicaService } from "../../services/prodavnica.service"
import * as ProdavniceActions from "./prodavnica.actions"
import { of } from "rxjs"
import { catchError, map, mergeMap } from "rxjs/operators"

@Injectable()
export class ProdavniceEffects {
    private actions$ = inject(Actions);
    private service = inject(ProdavnicaService);

    loadEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ProdavniceActions.loadItems),
            mergeMap(() => this.service.getProdavnice()
                .pipe(
                    map((prodavnice) => (ProdavniceActions.loadItemsSuccess({prodavnice}))),
                    catchError(() => of({ type: "Load error" }))
                )
            )
        )
    })
}