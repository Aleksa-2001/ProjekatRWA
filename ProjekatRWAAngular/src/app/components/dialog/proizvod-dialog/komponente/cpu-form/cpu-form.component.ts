import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-cpu-form',
  imports: [ReactiveFormsModule],
  templateUrl: './cpu-form.component.html',
  styleUrl: './cpu-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CPUFormComponent { 
  @Input() formGroup!: FormGroup
}
