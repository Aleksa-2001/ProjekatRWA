import { Injectable } from '@angular/core';
import { RacunarskaKomponenta } from '../models/komponente/racunarska-komponenta';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RacunarskaKomponentaService {

  constructor(private httpClient: HttpClient) { }

  getKomponente() {
    return this.httpClient
      .get<RacunarskaKomponenta[]>("http://localhost:3000/" + "komponente")
      .pipe(catchError(errorHandler))
  }

  getKomponentaByID(komponentaID: number) {
    return this.httpClient
      .get<RacunarskaKomponenta>("http://localhost:3000/" + `komponente/${komponentaID}`)
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
