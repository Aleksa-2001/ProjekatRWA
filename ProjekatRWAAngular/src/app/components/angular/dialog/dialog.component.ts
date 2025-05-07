import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DodajProizvodDialogComponent } from "./dodaj-proizvod-dialog/dodaj-proizvod-dialog.component";
import { NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { ErrorDialogComponent } from "./error-dialog/error-dialog.component";
import { DodajProdavnicuDialogComponent } from "./dodaj-prodavnicu-dialog/dodaj-prodavnicu-dialog.component";

@Component({
  selector: 'app-dialog',
  imports: [
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
    DodajProdavnicuDialogComponent, 
    DodajProizvodDialogComponent, 
    ErrorDialogComponent
],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent { 

  @Input() text?: string

}
