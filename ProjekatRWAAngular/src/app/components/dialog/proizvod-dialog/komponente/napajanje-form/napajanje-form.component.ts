import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-napajanje-form',
  imports: [ReactiveFormsModule],
  templateUrl: './napajanje-form.component.html',
  styleUrl: './napajanje-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NapajanjeFormComponent { 
  @Input() formGroup!: FormGroup
}
