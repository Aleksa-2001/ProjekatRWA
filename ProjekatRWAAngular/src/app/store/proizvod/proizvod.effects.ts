import { inject, Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { ProizvodService } from "../../services/proizvod.service"
import * as ProizvodiActions from "./proizvod.actions"
import { Observable, of } from "rxjs"
import { catchError, map, mergeMap, tap } from "rxjs/operators"
import { Router } from "@angular/router"
import { showToast } from "../toast/toast.actions"

@Injectable()
export class ProizvodiEffects {
    private actions$ = inject(Actions)
    private service = inject(ProizvodService)
    private router = inject(Router)

    loadEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ProizvodiActions.loadItems),
            mergeMap(({ prodavnicaID, tip }) => this.service.getProizvodi(prodavnicaID, tip)
                .pipe(
                    map((proizvodi) => (ProizvodiActions.loadItemsSuccess({proizvodi}))),
                    catchError((error) => of(ProizvodiActions.loadItemsFailure({ error })))
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
                    catchError((error) => of(ProizvodiActions.loadItemsFailure({ error })))
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
                    catchError((error) => of(ProizvodiActions.loadSelectedItemFailure({ error })))
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
                    catchError((error) => of(ProizvodiActions.addItemFailure({ error })))
                )
            )
        )
    })

    addProizvodSuccess$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ProizvodiActions.addItemSuccess),
            map(({ proizvod }) => showToast({ poruka: `Proizvod \"${proizvod.naziv}\" je uspešno dodat!`, tipPoruke: 'success' }))
        )
    })

    addProizvodFailure$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ProizvodiActions.addItemFailure),
            map(({ error }) => {
                if ((error as string).includes('API')) return showToast({ poruka: `Nije uspelo povezivanje sa serverom - ${error}`, tipPoruke: 'danger' })
                else if ((error as string).includes('500')) return showToast({ poruka: `Serverska greška - ${error}`, tipPoruke: 'danger' })
                else return showToast({ poruka: 'Greška pri dodavanju proizvoda', tipPoruke: 'danger' })
            })
        )
    })

    updateProizvod$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ProizvodiActions.updateItem),
            mergeMap(({ selectedProizvodID, selectedProizvod, file, selectMode }) => this.service.updateProizvod(selectedProizvodID, selectedProizvod)
                .pipe(
                    map((selectedProizvod) => {
                        if (selectMode) this.router.navigate(['/proizvod', selectedProizvodID])
                        return ProizvodiActions.updateItemSuccess({ 
                            proizvod: { id: selectedProizvod.id, changes: selectedProizvod }, 
                            selectedProizvod: selectedProizvod,
                            file: file
                        })
                    }),
                    catchError((error) => of(ProizvodiActions.updateItemFailure({ error })))
                )
            )
        )
    })

    updateProizvodSuccess$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ProizvodiActions.updateItemSuccess),
            map(({ proizvod }) => showToast({ poruka: `Proizvod \"${proizvod.changes.naziv}\" je uspešno izmenjen!`, tipPoruke: 'success' }))
        )
    })

    updateProizvodFailure$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ProizvodiActions.updateItemFailure),
            map(({ error }) => {
                if ((error as string).includes('API')) return showToast({ poruka: `Nije uspelo povezivanje sa serverom - ${error}`, tipPoruke: 'danger' })
                else if ((error as string).includes('500')) return showToast({ poruka: `Serverska greška - ${error}`, tipPoruke: 'danger' })
                else return showToast({ poruka: 'Greška pri izmeni proizvoda', tipPoruke: 'danger' })
            })
        )
    })

    updateRacunar$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ProizvodiActions.updateRacunar),
            mergeMap(({ selectedProizvodID, selectedProizvod }) => this.service.updateRacunar(selectedProizvodID, selectedProizvod)
                .pipe(
                    map((selectedProizvod) => {
                        this.router.navigate(['/proizvod', selectedProizvodID])
                        return ProizvodiActions.updateRacunarSuccess({
                            proizvod: { id: selectedProizvod.id, changes: selectedProizvod }, 
                            selectedProizvod: selectedProizvod
                        })
                    }),
                    catchError((error) => of(ProizvodiActions.updateRacunarFailure({ error })))
                )
            )
        )
    })

    updateRacunarSuccess$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ProizvodiActions.updateRacunarSuccess),
            map(({ selectedProizvod }) => showToast({ poruka: `Ažurirana komponenta računara \"${selectedProizvod.naziv}\"!`, tipPoruke: 'success' }))
        )
    })

    updateRacunarFailure$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ProizvodiActions.updateRacunarFailure),
            map(({ error }) => {
                if ((error as string).includes('API')) return showToast({ poruka: `Nije uspelo povezivanje sa serverom - ${error}`, tipPoruke: 'danger' })
                else if ((error as string).includes('500')) return showToast({ poruka: `Serverska greška - ${error}`, tipPoruke: 'danger' })
                else return showToast({ poruka: 'Greška pri selekciji komponente', tipPoruke: 'danger' })
            })
        )
    })

    deleteProizvod$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ProizvodiActions.deleteItem),
            mergeMap(({ selectedProizvodID }) => this.service.deleteProizvod(selectedProizvodID)
                .pipe(
                    map((data) => {
                        this.router.navigate(["/prodavnica", data.prodavnicaID])
                        return ProizvodiActions.deleteItemSuccess({proizvodID: data.proizvodID})
                    }),
                    catchError((error) => of(ProizvodiActions.deleteItemFailure({ error })))
                )
            )
        )
    })

    deleteProizvodSuccess$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ProizvodiActions.deleteItemSuccess),
            map(() => showToast({ poruka: `Proizvod je uspešno obrisan!`, tipPoruke: 'success' }))
        )
    })

    deleteProizvodFailure$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ProizvodiActions.deleteItemFailure),
            map(({ error }) => {
                if ((error as string).includes('API')) return showToast({ poruka: `Nije uspelo povezivanje sa serverom - ${error}`, tipPoruke: 'danger' })
                else if ((error as string).includes('500')) return showToast({ poruka: `Serverska greška - ${error}`, tipPoruke: 'danger' })
                else return showToast({ poruka: 'Greška pri brisanju proizvoda', tipPoruke: 'danger' })
            })
        )
    })

    deleteAll$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ProizvodiActions.deleteAllItems),
            mergeMap(({ prodavnicaID }) => this.service.deleteProizvodi(prodavnicaID)
                .pipe(
                    map((proizvodi) => ProizvodiActions.deleteAllItemsSuccess({proizvodi})),
                    catchError((error) => of(ProizvodiActions.deleteAllItemsFailure({ error })))
                )
            )
        )
    })

    deleteAllSuccess$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ProizvodiActions.deleteAllItemsSuccess),
            map(() => showToast({ poruka: `Svi proizvodi su obrisani!`, tipPoruke: 'warning' }))
        )
    })

    deleteAllFailure$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ProizvodiActions.deleteAllItemsFailure),
            map(({ error }) => {
                if ((error as string).includes('API')) return showToast({ poruka: `Nije uspelo povezivanje sa serverom - ${error}`, tipPoruke: 'danger' })
                else if ((error as string).includes('500')) return showToast({ poruka: `Serverska greška - ${error}`, tipPoruke: 'danger' })
                else return showToast({ poruka: 'Greška pri brisanju svih proizvoda', tipPoruke: 'danger' })
            })
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
                    map((proizvod) => ProizvodiActions.updatePathSuccess({
                        proizvod: { id: proizvod.id, changes: proizvod },
                        selectedProizvod: proizvod
                    })),
                    catchError(() => of({ type: "[Proizvod] Update path failed" }))
                )
            )
        )
    })
}