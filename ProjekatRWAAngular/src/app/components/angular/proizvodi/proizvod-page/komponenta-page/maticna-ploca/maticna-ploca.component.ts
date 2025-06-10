import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MaticnaPloca } from '../../../../../../models/komponente/maticna-ploca';

@Component({
  selector: 'app-maticna-ploca',
  imports: [],
  templateUrl: './maticna-ploca.component.html',
  styleUrl: './maticna-ploca.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaticnaPlocaComponent { 

  @Input() maticnaPloca!: MaticnaPloca
  
}
