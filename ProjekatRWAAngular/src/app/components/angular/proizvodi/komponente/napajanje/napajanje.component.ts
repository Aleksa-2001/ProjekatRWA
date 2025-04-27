import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Napajanje } from '../../../../models/komponente/napajanje';

@Component({
  selector: 'app-napajanje',
  imports: [],
  templateUrl: './napajanje.component.html',
  styleUrl: './napajanje.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NapajanjeComponent {

  @Input() napajanje?: Napajanje

}
