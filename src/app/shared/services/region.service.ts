import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Subject, tap } from "rxjs";

import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class RegionService {

    private listaRegiones: [] = [];
    regionesChanged = new Subject<void>;

    constructor(
        private http: HttpClient
    ) { }

    findAllRegiones() {
        return this.http
            .get<{ 'lista_regiones': [] }>(
                `${environment.apiUrl}regiones`
            )
            .pipe(
                tap(response => this.listaRegiones = response.lista_regiones)
            );
    }

    getRegion(id: number) {
        return this.http.get<any>(
            `${environment.apiUrl}regiones/${id}`
        );
    }

    addRegion(regForm: FormGroup) {
        const form = new FormData();
        const formData = regForm.value;
        Object.keys(formData).forEach((key) => {
            form.append(key, formData[key]);
        });
        this.http.post(
            `${environment.apiUrl}regiones/nueva`,
            form
        )
            .subscribe({
                next: () => {
                    this.regionesChanged.next();
                },
                error: (error) => { console.error(error) }
            })
    }

    updateRegion(id: number, modReg: FormGroup) {
        const formData = modReg.value;
        this.http.put(
            `${environment.apiUrl}regiones/${id}/editar`,
            formData
        ).subscribe({
            next: (response) => {
                console.log(response);
                this.regionesChanged.next();
            }
        });
    }

    deleteRegion(id: number) {
        this.http
            .delete(
                `${environment.apiUrl}regiones/${id}/eliminar`
            )
            .subscribe({
                next: () => {
                    this.regionesChanged.next();
                }
            });
    }
}