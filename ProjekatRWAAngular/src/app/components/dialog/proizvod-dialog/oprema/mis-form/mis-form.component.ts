import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-mis-form',
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './mis-form.component.html',
  styleUrl: './mis-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MisFormComponent { 
  @Input() formGroup!: FormGroup
}
