import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-zvucnik-form',
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './zvucnik-form.component.html',
  styleUrl: './zvucnik-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZvucnikFormComponent { 
  @Input() formGroup!: FormGroup
}
