import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Skladiste } from '../../../../../../models/komponente/skladiste';

@Component({
  selector: 'app-skladiste',
  imports: [],
  templateUrl: './skladiste.component.html',
  styleUrl: './skladiste.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkladisteComponent { 
  
  @Input() skladiste?: Skladiste

}
