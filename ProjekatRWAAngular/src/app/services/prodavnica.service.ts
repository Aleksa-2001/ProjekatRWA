import { Injectable } from '@angular/core';
import { Prodavnica } from '../models/prodavnica';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdavnicaService {

  constructor(private httpClient: HttpClient) { }

  getProdavnice() {
    return this.httpClient
      .get<Prodavnica[]>("http://localhost:3000/" + "prodavnice")
      .pipe(catchError(errorHandler))
  }

  getProdavnicaByID(prodavnicaID: number) {
    return this.httpClient
      .get<Prodavnica>("http://localhost:3000/" + `prodavnice/${prodavnicaID}`)
      .pipe(catchError(errorHandler))
  }
  
}

const errorHandler = (error: HttpErrorResponse) => {
  const errorMessage = 
    error.status === 0
      ? `Can't connect to API ${error.error}`
      : `Backend returned code ${error.status}` 
  
  return throwError(errorMessage)
}
