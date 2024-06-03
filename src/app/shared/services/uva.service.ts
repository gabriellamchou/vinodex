import { Injectable } from '@angular/core';
import { Uva } from '../models/uva.model';
import { HttpClient } from '@angular/common/http';
import { Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UvaService {

  uvasChanged = new Subject<void>();

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

  addUva(uvaForm: FormGroup) {
    const form = new FormData();
    const formData = uvaForm.value;
    Object.keys(formData).forEach((key) => {
      form.append(key, formData[key]);
    });
    this.http.post(
      `${environment.apiUrl}uvas/nueva`,
      form
    )
      .subscribe({
        next: (response) => { 
          console.log(response);
          this.uvasChanged.next();
        },
        error: (error) => { console.error(error) }
      })
  }

  updateUva(id: number, modUva: FormGroup) {
    const form = new FormData();
    const formData = modUva.value;

    Object.keys(formData).forEach((key) => {
      form.append(key, formData[key]);
    });

    this.http.put(
      `${environment.apiUrl}uvas/${id}/editar`,
      formData
    ).subscribe({
      next: (response) => {
        console.log(response);
        this.uvasChanged.next();
      }
    });
  }

  deleteUva(id: number) {
    this.http
      .delete(
        `${environment.apiUrl}uvas/${id}/eliminar`
      )
      .subscribe({
        next: (response) => {
          console.log(response);
          this.uvasChanged.next();
        }
      })
  }
}
