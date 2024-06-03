import { Injectable } from '@angular/core';
import { Uva } from '../models/uva.model';
import { HttpClient } from '@angular/common/http';
import { Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UvaService {

  uvasChanged = new Subject<Uva[]>();

  private listaUvas: Uva[] = []

  constructor(
    private http: HttpClient
  ) { }

  findAllUvas() {
    return this.http
      .get<{ 'lista_uvas': [] }>(
        `${environment.apiUrl}uvas`
      )
      .pipe(
        tap(response => this.listaUvas = response.lista_uvas)
      );
  }

  getListaUvas() {
    return this.listaUvas;
  }

  getUva(id: number) {
    return this.listaUvas.find(
      (uva) => uva.id === id
    )
  }

  deleteUva(id: number) {
    console.log("El método deleteUva todavía no está desarrollado");
    
  }
}
