import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Subject, tap } from "rxjs";

import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class TipoService {

    private listaTipos: [] = [];
    tiposChanged = new Subject<void>;

    constructor(
        private http: HttpClient
    ) { }

    findAllTipos() {
        return this.http
            .get<{ 'lista_tipos': [] }>(
                `${environment.apiUrl}tipos`
            )
            .pipe(
                tap(response => this.listaTipos = response.lista_tipos)
            );
    }

    getTipo(id: number) {
        return this.http.get<any>(
            `${environment.apiUrl}tipos/${id}`
        );
    }

    addTipo(bodForm: FormGroup) {
        const form = new FormData();
        const formData = bodForm.value;
        Object.keys(formData).forEach((key) => {
            form.append(key, formData[key]);
        });
        this.http.post(
            `${environment.apiUrl}tipos/nuevo`,
            form
        )
            .subscribe({
                next: () => {
                    this.tiposChanged.next();
                },
                error: (error) => { console.error(error) }
            })
    }

    updateTipo(id: number, modBod: FormGroup) {
        const formData = modBod.value;
        this.http.put(
            `${environment.apiUrl}tipos/${id}/editar`,
            formData
        ).subscribe({
            next: (response) => {
                console.log(response);
                this.tiposChanged.next();
            }
        });
    }

    deleteTipo(id: number) {
        this.http
            .delete(
                `${environment.apiUrl}tipos/${id}/eliminar`
            )
            .subscribe({
                next: () => {
                    this.tiposChanged.next();
                }
            });
    }
}