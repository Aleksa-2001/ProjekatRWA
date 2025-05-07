import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ProizvodDialogComponent } from "./proizvod-dialog/proizvod-dialog.component";
import { NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { ErrorDialogComponent } from "./error-dialog/error-dialog.component";
import { ProdavnicaDialogComponent } from "./prodavnica-dialog/prodavnica-dialog.component";
import { ConfirmDialogComponent } from "./confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-dialog',
  imports: [
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
    ProdavnicaDialogComponent,
    ProizvodDialogComponent,
    ConfirmDialogComponent,
    ErrorDialogComponent
],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent { 

  @Input() text!: string

}
