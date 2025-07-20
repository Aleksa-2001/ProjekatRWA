import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Kuciste } from '../../../../../models/komponente/kuciste';

@Component({
  selector: 'app-kuciste',
  imports: [],
  templateUrl: './kuciste.component.html',
  styleUrl: './kuciste.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KucisteComponent { 

  @Input() kuciste!: Kuciste

}
