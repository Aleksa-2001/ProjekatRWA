import { Injectable } from '@angular/core';
import { Proizvod } from '../models/proizvod';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProizvodService {

  constructor(private httpClient: HttpClient) { }

  //getAll() {
  //  return this.httpClient
  //    .get<Proizvod[]>("http://localhost:3000/" + "proizvodi")
  //    .pipe(catchError(errorHandler))
  //}
  
  getProizvodi(prodavnicaID: number) {
    return this.httpClient
      .get<Proizvod[]>("http://localhost:3000/" + `proizvodi/${prodavnicaID}`)
      .pipe(catchError(errorHandler))
  }
  
  getProizvodiBySearch(search: string) {
    return this.httpClient
      .get<Proizvod[]>("http://localhost:3000/" + `proizvodi?search=${search}`)
      .pipe(catchError(errorHandler))
  }


  getProizvodByID(proizvodID: number) {
    return this.httpClient
      .get<Proizvod>("http://localhost:3000/" + `proizvod/${proizvodID}`)
      .pipe(catchError(errorHandler))
  }
  
  addProizvod(proizvod: Proizvod) {
    const { id, ...proizvodDto } = proizvod
    return this.httpClient
      .post<Proizvod>("http://localhost:3000/" + "proizvod", proizvodDto)
      .pipe(catchError(errorHandler))
  }

  updateProizvod(proizvodID: number, proizvod: Partial<Proizvod>) {
    const { id, ...proizvodDto } = proizvod
    return this.httpClient
      .put<Proizvod>("http://localhost:3000/" + `proizvod/${proizvodID}`, proizvodDto)
      .pipe(catchError(errorHandler))
  }

  deleteProizvod(proizvodID: number) {
    return this.httpClient
      .delete<number>("http://localhost:3000/" + `proizvod/${proizvodID}`)
      .pipe(catchError(errorHandler))
  }

  deleteProizvodi(prodavnicaID: number) {
    return this.httpClient
      .delete<Proizvod[]>("http://localhost:3000/" + `proizvodi/${prodavnicaID}`)
      .pipe(catchError(errorHandler))
  }

  uploadImage(proizvodID: number, file?: FormData) {
    if (file) {
      return this.httpClient
        .post<{ proizvodID: number, path: string }>("http://localhost:3000/" + `proizvod/upload/${proizvodID}`, file)
        .pipe(catchError(errorHandler))
    }
    else {
      return of("Slika nije prosledjena")
    }
  }

}

const errorHandler = (error: HttpErrorResponse) => {
  const errorMessage = 
    error.status === 0
      ? `Can't connect to API ${error.error}`
      : `Backend returned code ${error.status}` 
  
  return throwError(errorMessage)
}
