import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { FormGroup } from '@angular/forms';

import { Vino } from '../models/vino.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VinoService {

  vinosChanged = new Subject<Vino[]>();

  private listaVinos: Vino[] = []

  constructor(
    private http: HttpClient
  ) { }

  findAllVinos() {
    return this.http
      .get<{ 'lista_vinos': [] }>(
        `${environment.apiUrl}vinos`
      )
      .subscribe({
        next: (response) => {
          const responseVinos: Vino[] = [];

          for (const vino of response.lista_vinos) {
            responseVinos.push(
              new Vino(
                vino['Id'],
                vino['Nombre'],
                vino['Precio'],
                vino['Region'],
                {
                  id: vino['TipoId'],
                  nombre: vino['TipoNombre'],
                  descripcion: vino['TipoDescripcion']
                },
                {
                  id: vino['BodegaId'],
                  nombre: vino['BodegaNombre'],
                  descripcion: vino['BodegaDescripcion']
                },
                vino['Anada'],
                vino['Alergenos'],
                vino['Graduacion'],
                vino['BreveDescripcion'],
                vino['Capacidad'],
                vino['Stock'],
                {
                  imgAnv: null,
                  imgRev: null,
                  imgDet: null,
                },
                null
              )
            );
          }
          this.setListaVinos(responseVinos);
        }
      })
  }

  pruebaGet() {
    return this.http
      .get(
        `${environment.apiUrl}prueba-get`
      )
  }

  getListaVinos() {
    return this.listaVinos;
  }

  setListaVinos(vinos: Vino[]) {
    this.listaVinos = vinos;
    this.vinosChanged.next(this.listaVinos);
  }

  getVino(id: number) {
    return this.listaVinos.find(
      (vino) => vino.id === id
    );
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
      .subscribe(
        response => console.log(response),
        error => console.error(error)
      )
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
    ).subscribe(
      response => console.log(response)
    );
  }

  deleteVino(id: number) {
    const index = this.listaVinos.indexOf(this.getVino(id)!);
    this.listaVinos.splice(index, 1);
  }
}
