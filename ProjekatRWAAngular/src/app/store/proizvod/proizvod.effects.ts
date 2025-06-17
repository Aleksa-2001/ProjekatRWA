import { inject, Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { ProizvodService } from "../../services/proizvod.service"
import * as ProizvodiActions from "./proizvod.actions"
import { Observable, of } from "rxjs"
import { catchError, map, mergeMap } from "rxjs/operators"

@Injectable()
export class ProizvodiEffects {
    private actions$ = inject(Actions)
    private service = inject(ProizvodService)

    //constructor(private service: RacunarskaKomponentaService, private actions$: Actions) { }

    loadEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ProizvodiActions.loadItems),
            mergeMap(({ prodavnicaID }) => this.service.getProizvodi(prodavnicaID)
                .pipe(
                    map((proizvodi) => (ProizvodiActions.loadItemsSuccess({proizvodi}))),
                    catchError(() => of({ type: "[Proizvod] Load error" }))
                )
            )
        )
    })

    loadBySearch$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ProizvodiActions.loadItemsBySearch),
            mergeMap(({ search }) => this.service.getProizvodiBySearch(search)
                .pipe(
                    map((proizvodi) => (ProizvodiActions.loadItemsSuccess({proizvodi}))),
                    catchError(() => of({ type: "[Proizvod] Load error" }))
                )
            )
        )
    })

    loadProizvod$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ProizvodiActions.loadSelectedItem),
            mergeMap(({ selectedProizvodID }) => this.service.getProizvodByID(selectedProizvodID)
                .pipe(
                    map((selectedProizvod) => (ProizvodiActions.loadSelectedItemSuccess({selectedProizvod}))),
                    catchError(() => of({ type: "[Proizvod] Load item error" }))
                )
            )
        )
    })

    addProizvod$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ProizvodiActions.addItem),
            mergeMap(({ proizvod, file }) => this.service.addProizvod(proizvod)
                .pipe(
                    map((proizvod) => (ProizvodiActions.addItemSuccess({ proizvod, file }))),
                    catchError(() => of({ type: "[Proizvod] Add error" }))
                )
            )
        )
    })

    updateProizvod$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ProizvodiActions.updateItem),
            mergeMap(({ selectedProizvodID, selectedProizvod, file }) => this.service.updateProizvod(selectedProizvodID, selectedProizvod)
                .pipe(
                    map((selectedProizvod) => (ProizvodiActions.updateItemSuccess({ 
                        proizvod: { id: selectedProizvod.id, changes: selectedProizvod }, 
                        selectedProizvod: selectedProizvod,
                        file: file
                    }))),
                    catchError(() => of({ type: "[Proizvod] Update error" }))
                )
            )
        )
    })

    deleteProizvod$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ProizvodiActions.deleteItem),
            mergeMap(({ selectedProizvodID }) => this.service.deleteProizvod(selectedProizvodID)
                .pipe(
                    map((proizvodID) => (ProizvodiActions.deleteItemSuccess({proizvodID}))),
                    catchError(() => of({ type: "[Proizvod] Delete error" }))
                )
            )
        )
    })

    deleteAll$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ProizvodiActions.deleteAllItems),
            mergeMap(({ prodavnicaID }) => this.service.deleteProizvodi(prodavnicaID)
                .pipe(
                    map((proizvodi) => ProizvodiActions.deleteAllItemsSuccess({proizvodi})),
                    catchError(() => of({ type: "[Proizvod] Delete all error" }))
                )
            )
        )
    })

    uploadImage$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ProizvodiActions.addItemSuccess, ProizvodiActions.updateItemSuccess),
            mergeMap(({ proizvod, file }) => (this.service.uploadImage((proizvod.id as number), file) as Observable<{proizvodID: number, path: string}>)
                .pipe(
                    map((res) => {
                        if (res.proizvodID && res.path) return ProizvodiActions.uploadImageSuccess({ proizvodID: res.proizvodID, path: res.path })
                        else return ProizvodiActions.uploadImageIgnore()
                    }),
                    catchError(() => of({ type: "[Proizvod] Upload failed" }))
                )
            )
        )
    })

    updateImagePath$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ProizvodiActions.uploadImageSuccess),
            mergeMap(({ proizvodID, path }) => this.service.updateProizvod(proizvodID, { slika: path })
                .pipe(
                    map((proizvod) => ProizvodiActions.updatePathSucces({
                        proizvod: { id: proizvod.id, changes: proizvod },
                        selectedProizvod: proizvod
                    })),
                    catchError(() => of({ type: "[Proizvod] Update path failed" }))
                )
            )
        )
    })
}