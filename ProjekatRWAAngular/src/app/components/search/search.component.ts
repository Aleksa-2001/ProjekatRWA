import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, NgClass } from "@angular/common";

@Component({
  selector: 'app-search',
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    NgClass
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit { 

  @Input() query!: string
  @Input() navbar: boolean = false

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
    this.router.navigate(['search'], { queryParams: { q: queryString } })
  }

  onInput(event: any) {
    this.query = event.target.value
  }

  isEmptyOrWhiteSpace(input: string) {
    if (input === null || input === undefined) return true
    return input.trim() === ""
  }

}
