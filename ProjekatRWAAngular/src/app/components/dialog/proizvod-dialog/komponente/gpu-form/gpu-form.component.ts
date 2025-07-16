import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-gpu-form',
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './gpu-form.component.html',
  styleUrl: './gpu-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GPUFormComponent { 
  @Input() formGroup!: FormGroup
}
