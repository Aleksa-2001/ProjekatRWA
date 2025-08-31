import { inject, Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { ProdavnicaService } from "../../services/prodavnica.service"
import { Observable, of } from "rxjs"
import { catchError, map, mergeMap } from "rxjs/operators"
import { Router } from "@angular/router"
import { showToast } from "../toast/toast.actions"
import * as ProdavniceActions from "./prodavnica.actions"

@Injectable()
export class ProdavniceEffects {
    private actions$ = inject(Actions)
    private service = inject(ProdavnicaService)
    private router = inject(Router)

    loadEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ProdavniceActions.loadItems),
            mergeMap(() => this.service.getProdavnice()
                .pipe(
                    map((prodavnice) => (ProdavniceActions.loadItemsSuccess({prodavnice}))),
                    catchError((error) => of(ProdavniceActions.loadItemsFailure({ error })))
                )
            )
        )
    })

    loadBySearch$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ProdavniceActions.loadItemsBySearch),
            mergeMap(({ search }) => this.service.getProdavniceBySearch(search)
                .pipe(
                    map((prodavnice) => (ProdavniceActions.loadItemsSuccess({prodavnice}))),
                    catchError((error) => of(ProdavniceActions.loadItemsFailure({ error })))
                )
            )
        )
    })

    loadRecommended$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ProdavniceActions.loadRecommendedItems),
            mergeMap(() => this.service.getProdavniceRecommended()
                .pipe(
                    map((prodavnice) => (ProdavniceActions.loadItemsSuccess({prodavnice}))),
                    catchError((error) => of(ProdavniceActions.loadItemsFailure({ error })))
                )
            )
        )
    })

    loadProdavnica$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ProdavniceActions.loadSelectedItem),
            mergeMap(({ selectedProdavnicaID }) => this.service.getProdavnicaByID(selectedProdavnicaID)
                .pipe(
                    map((selectedProdavnica) => (ProdavniceActions.loadSelectedItemSuccess({selectedProdavnica}))),
                    catchError((error) => of(ProdavniceActions.loadSelectedItemFailure({ error })))
                )
            )
        )
    })

    addProdavnica$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ProdavniceActions.addItem),
            mergeMap(({ prodavnica, file }) => this.service.addProdavnica(prodavnica)
                .pipe(
                    map((prodavnica) => {
                        file?.append('id', prodavnica.id.toString())
                        return ProdavniceActions.addItemSuccess({ prodavnica, file })
                    }),
                    catchError((error) => of(ProdavniceActions.addItemFailure({ error })))
                )
            )
        )
    })

    addProdavnicaSuccess$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ProdavniceActions.addItemSuccess),
            map(({ prodavnica }) => showToast({ poruka: `Prodavnica \"${prodavnica.naziv}\" je uspešno dodata!`, tipPoruke: 'success' }))
        )
    })

    addProdavnicaFailure$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ProdavniceActions.addItemFailure),
            map(({ error }) => {
                if ((error as string).includes('API')) return showToast({ poruka: `Nije uspelo povezivanje sa serverom - ${error}`, tipPoruke: 'danger' })
                else if ((error as string).includes('500')) return showToast({ poruka: `Serverska greška - ${error}`, tipPoruke: 'danger' })
                else return showToast({ poruka: 'Greška pri dodavanju prodavnice', tipPoruke: 'danger' })
            })
        )
    })

    updateProdavnica$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ProdavniceActions.updateItem),
            mergeMap(({ selectedProdavnicaID, selectedProdavnica, file }) => this.service.updateProdavnica(selectedProdavnicaID, selectedProdavnica)
                .pipe(
                    map((prodavnica) => (ProdavniceActions.updateItemSuccess({
                        prodavnica: { id: prodavnica.id, changes: prodavnica },
                        selectedProdavnica: prodavnica,
                        file: file
                    }))),
                    catchError((error) => of(ProdavniceActions.updateItemFailure({ error })))
                )
            )
        )
    })

    updateProdavnicaSuccess$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ProdavniceActions.updateItemSuccess),
            map(({ prodavnica }) => showToast({ poruka: `Prodavnica \"${prodavnica.changes.naziv}\" je uspešno izmenjena!`, tipPoruke: 'success' }))
        )
    })

    updateProdavnicaFailure$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ProdavniceActions.updateItemFailure),
            map(({ error }) => {
                if ((error as string).includes('API')) return showToast({ poruka: `Nije uspelo povezivanje sa serverom - ${error}`, tipPoruke: 'danger' })
                else if ((error as string).includes('500')) return showToast({ poruka: `Serverska greška - ${error}`, tipPoruke: 'danger' })
                else return showToast({ poruka: 'Greška pri izmeni prodavnice', tipPoruke: 'danger' })
            })
        )
    })

    deleteProdavnica$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ProdavniceActions.deleteItem),
            mergeMap(({ selectedProdavnicaID }) => this.service.deleteProdavnica(selectedProdavnicaID)
                .pipe(
                    map((prodavnicaID) => {
                        this.router.navigate(["/prodavnice"])
                        return ProdavniceActions.deleteItemSuccess({prodavnicaID})
                    }),
                    catchError((error) => of(ProdavniceActions.deleteItemFailure({ error })))
                )
            )
        )
    })

    deleteProdavnicaSuccess$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ProdavniceActions.deleteItemSuccess),
            map(() => showToast({ poruka: `Prodavnica je uspešno obrisana!`, tipPoruke: 'success' }))
        )
    })

    deleteProdavnicaFailure$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ProdavniceActions.deleteItemFailure),
            map(({ error }) => {
                if ((error as string).includes('API')) return showToast({ poruka: `Nije uspelo povezivanje sa serverom - ${error}`, tipPoruke: 'danger' })
                else if ((error as string).includes('500')) return showToast({ poruka: `Serverska greška - ${error}`, tipPoruke: 'danger' })
                else return showToast({ poruka: 'Greška pri brisanju prodavnice', tipPoruke: 'danger' })
            })
        )
    })

    uploadImage$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ProdavniceActions.addItemSuccess, ProdavniceActions.updateItemSuccess),
            mergeMap(({ prodavnica, file }) => (this.service.uploadImage((prodavnica.id as number), file) as Observable<{prodavnicaID: number, path: string}>)
                .pipe(
                    map((res) => {
                        if (res.prodavnicaID && res.path) return ProdavniceActions.uploadImageSuccess({ prodavnicaID: res.prodavnicaID, path: res.path })
                        else return ProdavniceActions.uploadImageIgnore()
                    }),
                    catchError(() => of({ type: "[Prodavnica] Upload failed" }))
                )
            )
        )
    })

    updateImagePath$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ProdavniceActions.uploadImageSuccess),
            mergeMap(({ prodavnicaID, path }) => this.service.updateProdavnica(prodavnicaID, { slika: path })
                .pipe(
                    map((prodavnica) => ProdavniceActions.updatePathSuccess({
                        prodavnica: { id: prodavnica.id, changes: prodavnica },
                        selectedProdavnica: prodavnica
                    })),
                    catchError(() => of({ type: "[Prodavnica] Update path failed" }))
                )
            )
        )
    })
}