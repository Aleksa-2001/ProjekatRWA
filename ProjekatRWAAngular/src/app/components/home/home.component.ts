import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SearchComponent } from "../search/search.component";

@Component({
  selector: 'app-home',
  imports: [SearchComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {

  constructor(private title: Title) {    
    this.title.setTitle("Početna strana - ProjekatRWA")
  }

}
