import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-ram-form',
  imports: [ReactiveFormsModule],
  templateUrl: './ram-form.component.html',
  styleUrl: './ram-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RAMFormComponent { 
  @Input() formGroup!: FormGroup
}
