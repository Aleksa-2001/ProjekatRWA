import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-kuciste-form',
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './kuciste-form.component.html',
  styleUrl: './kuciste-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KucisteFormComponent { 
  @Input() formGroup!: FormGroup
}
