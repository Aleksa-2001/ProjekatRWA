import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Prodavnica } from '../../../models/prodavnica';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { filter, Observable, of, take, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app-state';
import { selectSelectedProdavnica } from '../../../store/prodavnica/prodavnica.selectors';
import * as ProdavniceActions from "../../../store/prodavnica/prodavnica.actions"

@Component({
  selector: 'app-prodavnica-dialog',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './prodavnica-dialog.component.html',
  styleUrl: './prodavnica-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProdavnicaDialogComponent implements OnInit { 

  form!: FormGroup
  
  @Input() modalID!: string
  @Input() mode: number = 0
  title: string = ""
  
  prodavnica$: Observable<Prodavnica | null> = of()
  prodavnicaID: number = -1
  
  formData?: FormData
  filename: string = ""

  constructor(private fb: FormBuilder, private store: Store<AppState>) { }

  ngOnInit(): void {
    if (this.mode === 1) {
      this.title = 'Izmeni prodavnicu'
      this.prodavnica$ = this.store.select(selectSelectedProdavnica)

      this.prodavnica$.pipe(
        filter(prodavnica => !!prodavnica),
        take(1),
        tap(prodavnica => {
          this.prodavnicaID = prodavnica.id
          this.filename = prodavnica.slika
          
          this.form = this.fb.group({
            naziv: [prodavnica.naziv, Validators.required],
            adresa: [prodavnica.adresa, Validators.required],
            opis: [prodavnica.opis],
            slika: ['']
          })
        })
      ).subscribe()
    }
    else {
      this.title = 'Dodaj prodavnicu'
      this.form = this.fb.group({
        naziv: ['', Validators.required],
        adresa: ['', Validators.required],
        opis: [''],
        slika: ['']
      })
    }
  }

  resetForm(addEvent: boolean = false) {
    this.form.reset()

    if (addEvent) this.filename = ""
    else this.removeFile()
  }

  onFileSelected(event: any) {
    const file = event.target.files[0]
    if (file) {
      if (file.type === "image/jpeg" || file.type === "image/png") {
        this.filename = `${file.name}`
        this.formData = new FormData()
        this.formData.append('file', file)
        return
      }
      else {
        console.log("Fajl nije slika!")
      }
    }
  }

  removeFile() {
    this.formData?.delete('file')
    this.formData = undefined
    this.filename = ""
  }
  
  onCancel() {
    if (this.mode === 0) this.resetForm()
  }

  onSubmit() {
    if (this.form.valid) {
      const path = "images/prodavnice/"
      const prodavnica = this.form.getRawValue()

      const prodavnicaData = {
        id: this.prodavnicaID,
        naziv: prodavnica.naziv,
        adresa: prodavnica.adresa,
        opis: prodavnica.opis ?? "",
        slika: (prodavnica.slika && this.filename) ? prodavnica.slika : "",
      }

      //console.log(prodavnicaData)
      
      if (this.mode === 1) {
        prodavnicaData.slika = this.generatePath(path, this.filename, this.prodavnicaID)
        this.store.dispatch(ProdavniceActions.updateItem({ selectedProdavnicaID: this.prodavnicaID, selectedProdavnica: <Prodavnica>prodavnicaData, file: this.formData }))
        this.filename = prodavnicaData.slika
      }
      else {
        if (!this.filename) {
          prodavnica.slika = ""
          this.removeFile()
        }
        this.store.dispatch(ProdavniceActions.addItem({ prodavnica: <Prodavnica>prodavnicaData, file: this.formData }))
        this.resetForm(true)
      }
    }
  }

  private generatePath(path: string, filename: string, id?: number) {
    if (filename) return `${path}${id ?? 'temp'}${filename.substring(this.filename.lastIndexOf('.'), this.filename.length)}`
    else return ""
  }

}
