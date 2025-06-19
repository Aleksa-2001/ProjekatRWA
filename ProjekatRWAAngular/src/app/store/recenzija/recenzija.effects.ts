import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { RecenzijaService } from "../../services/recenzija.service";
import { catchError, map, mergeMap, of } from "rxjs";
import * as RecenzijeActions from "./recenzija.actions"

@Injectable()
export class RecenzijeEffects {
    private actions$ = inject(Actions)
    private service = inject(RecenzijaService)

    loadEffectProdavnica = createEffect(() => {
        return this.actions$.pipe(
            ofType(RecenzijeActions.loadItemsProdavnica),
            mergeMap(({ prodavnicaID }) => this.service.getRecenzijeByProdavnicaID(prodavnicaID).pipe(
                map(recenzije => RecenzijeActions.loadItemsSuccess({ recenzije })),
                catchError(() => of({ type: "[Recenzija] Load Items Error" }))
            )) 
        )
    })

    loadEffectProizvod = createEffect(() => {
        return this.actions$.pipe(
            ofType(RecenzijeActions.loadItemsProizvod),
            mergeMap(({ proizvodID }) => this.service.getRecenzijeByProizvodID(proizvodID).pipe(
                map(recenzije => RecenzijeActions.loadItemsSuccess({ recenzije })),
                catchError(() => of({ type: "[Recenzija] Load Items Error" }))
            )) 
        )
    })

}