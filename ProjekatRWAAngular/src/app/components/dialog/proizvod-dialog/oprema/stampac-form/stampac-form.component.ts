import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-stampac-form',
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './stampac-form.component.html',
  styleUrl: './stampac-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StampacFormComponent { 
  @Input() formGroup!: FormGroup
}
