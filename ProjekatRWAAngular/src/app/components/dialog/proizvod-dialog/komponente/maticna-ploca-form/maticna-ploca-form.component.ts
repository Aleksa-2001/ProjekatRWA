import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-maticna-ploca-form',
  imports: [ReactiveFormsModule],
  templateUrl: './maticna-ploca-form.component.html',
  styleUrl: './maticna-ploca-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaticnaPlocaFormComponent { 
  @Input() formGroup!: FormGroup
}
