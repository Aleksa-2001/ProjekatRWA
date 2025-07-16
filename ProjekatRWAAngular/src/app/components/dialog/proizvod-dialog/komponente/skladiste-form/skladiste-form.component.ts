import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-skladiste-form',
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './skladiste-form.component.html',
  styleUrl: './skladiste-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkladisteFormComponent { 
  @Input() formGroup!: FormGroup
}
