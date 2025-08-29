import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-slusalice-form',
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './slusalice-form.component.html',
  styleUrl: './slusalice-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlusaliceFormComponent { 
  @Input() formGroup!: FormGroup
}
