import { Injectable } from '@angular/core';
import { RacunarskaKomponenta } from '../models/racunarskaKomponenta';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RacunarskaKomponentaService {

  //private komponente: Array<RacunarskaKomponenta> = new Array()

  constructor(private httpClient: HttpClient) { 
    //this.komponente.push(new CPU(0, 1, 'AMD', 'Ryzen 3 3200G', 21000, 'images/ng/komponente/3200g.jpg', 3.6, 4, 4))
    //this.komponente.push(new GPU(0, 2, 'nVidia', 'GeForce RTX 4090', 99999, 'images/ng/komponente/geforce-rtx-4090.jpg', 2.8, 16))
  }

  getKomponente() {
    return this.httpClient
      .get<RacunarskaKomponenta[]>("http://localhost:3000/" + "komponente")
      .pipe(catchError(errorHandler))
    //return this.komponente;
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
