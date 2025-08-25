import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent implements OnInit { 

  appName = environment.appName
  
  constructor(private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle(`O nama - ${this.appName}`)
  }

}
