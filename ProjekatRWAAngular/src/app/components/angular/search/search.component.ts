import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  imports: [ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit { 

  @Input() query!: string
  searchForm!: FormGroup

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      inputSearch: [this.query, Validators.required]
    })
  }

  onSubmit() {
    const data = this.searchForm.getRawValue()
    const queryString = (data.inputSearch as string).trim()
    this.router.navigate(['ng/search'], { queryParams: { q: queryString } })
  }

  isEmptyOrWhiteSpace(input: string){
    return input === null || input.trim() === ""
  }

}
