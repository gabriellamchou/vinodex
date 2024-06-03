import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, tap } from 'rxjs';
import { FormGroup } from '@angular/forms';

import { Vino } from '../models/vino.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VinoService {

  vinosChanged = new Subject<void>();

  private listaVinos: Vino[] = []

  constructor(
    private http: HttpClient
  ) { }

  findAllVinos() {
    return this.http
      .get<{ 'lista_vinos': [] }>(
        `${environment.apiUrl}vinos`
      )
      .pipe(
        tap(response => this.listaVinos = response.lista_vinos)
      )
  }

  getListaVinos() {
    return this.listaVinos;
  }

  getVino(id: number) {
    return this.http.get<any>(
      `${environment.apiUrl}vinos/${id}`
    )
  }

  addVino(vinoForm: FormGroup<any>) {
    const form = new FormData();
    const formData = vinoForm.value;
    Object.keys(formData).forEach((key) => {
      if (key !== 'imagenes' && key !== 'uvas') {
        form.append(key, formData[key]);
      } else if (key === 'imagenes') {
        Object.keys(formData[key]).forEach((imgKey) => {
          form.append(`imagenes[${imgKey}]`, formData[key][imgKey]);
        });
      } else if (key === 'uvas') {
        formData[key].forEach((uva: any, index: number) => {
          form.append(`uvas[${index}][id]`, uva.id);
          form.append(`uvas[${index}][porcentaje]`, uva.porcentaje);
        });
      }
    });
    this.http.post(
      `${environment.apiUrl}vinos/nuevo`,
      form
    )
      .subscribe({
        next: (response) => { 
          console.log(response);
          this.vinosChanged.next(); 
        },
        error: (error) => { console.error(error) }
      })
  }

  updateVino(id: number, modVino: FormGroup<any>) {
    const form = new FormData();
    const formData = modVino.value;

    // Añade todos los campos de texto al FormData
    Object.keys(formData).forEach((key) => {
      if (key !== 'imagenes' && key !== 'uvas') {
        form.append(key, formData[key]);
      } else if (key === 'imagenes') {
        Object.keys(formData[key]).forEach((imgKey) => {
          form.append(`imagenes[${imgKey}]`, formData[key][imgKey]);
        });
      } else if (key === 'uvas') {
        formData[key].forEach((uva: any, index: number) => {
          form.append(`uvas[${index}][id]`, uva.id);
          form.append(`uvas[${index}][porcentaje]`, uva.porcentaje);
        });
      }
    });

    this.http.post(
      `${environment.apiUrl}vinos/${id}/editar`,
      form
    )
    .subscribe({
      next: (response) => {
        console.log(response);
        this.vinosChanged.next();
      }
    });
  }

  deleteVino(id: number) {
    return this.http
      .delete(
        `${environment.apiUrl}vinos/${id}/eliminar`
      )
      .subscribe({
        next: () => {
          this.vinosChanged.next();
        }
      });
  }
}
