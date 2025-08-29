import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-tastatura-form',
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './tastatura-form.component.html',
  styleUrl: './tastatura-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TastaturaFormComponent { 
  @Input() formGroup!: FormGroup
}
