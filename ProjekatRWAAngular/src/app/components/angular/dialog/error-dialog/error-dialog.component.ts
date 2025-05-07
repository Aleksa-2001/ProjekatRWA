import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-error-dialog',
  imports: [],
  templateUrl: './error-dialog.component.html',
  styleUrl: './error-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorDialogComponent { }
