import { Injectable } from '@angular/core';
import { Prodavnica } from '../models/prodavnica';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, of, throwError } from 'rxjs';

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

  getProdavniceBySearch(search: string) {
    return this.httpClient
      .get<Prodavnica[]>("http://localhost:3000/" + `prodavnice/${search}`)
      .pipe(catchError(errorHandler))
  }

  getProdavnicaByID(prodavnicaID: number) {
    return this.httpClient
      .get<Prodavnica>("http://localhost:3000/" + `prodavnica/${prodavnicaID}`)
      .pipe(catchError(errorHandler))
  }

  addProdavnica(prodavnica: Prodavnica) {
    const { id, ...prodavnicaDto } = prodavnica
    return this.httpClient
      .post<Prodavnica>("http://localhost:3000/" + "prodavnica", prodavnicaDto)
      .pipe(catchError(errorHandler))
  }

  updateProdavnica(prodavnicaID: number, prodavnica: Partial<Prodavnica>) {
    const { id, ...prodavnicaDto } = prodavnica
    return this.httpClient
      .put<Prodavnica>("http://localhost:3000/" + `prodavnica/${prodavnicaID}`, prodavnicaDto)
      .pipe(catchError(errorHandler))
  }

  deleteProdavnica(prodavnicaID: number) {
    return this.httpClient
      .delete<number>("http://localhost:3000/" + `prodavnica/${prodavnicaID}`)
      .pipe(catchError(errorHandler))
  }
  
  uploadImage(prodavnicaID: number, file?: FormData) {
    if (file) {
      console.log(file)
      return this.httpClient
        .post<{ prodavnicaID: number, path: string }>("http://localhost:3000/" + `prodavnica/upload/${prodavnicaID}`, file)
        .pipe(catchError(errorHandler))
    }
    else {
      console.log("nema slike")
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
