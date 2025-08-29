import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-monitor-form',
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './monitor-form.component.html',
  styleUrl: './monitor-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MonitorFormComponent { 
  @Input() formGroup!: FormGroup
}
