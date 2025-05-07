import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Prodavnica } from '../../../../models/prodavnica';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-dodaj-prodavnicu-dialog',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './dodaj-prodavnicu-dialog.component.html',
  styleUrl: './dodaj-prodavnicu-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DodajProdavnicuDialogComponent { 

  form: FormGroup
  formData: any

  @Input() title?: string
  @Input() prodavnica?: Prodavnica | null

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      naziv: ['', Validators.required],
      adresa: ['', Validators.required],
      opis: [''],
      slika: ['']
    })
  }

  onSubmit() {
    if (this.form.valid) {
      const prodavnica = this.form.value
      prodavnica.id = -1
      console.log(prodavnica)
      
    }
  }

}
