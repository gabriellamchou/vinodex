import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Subject, tap } from "rxjs";

import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class BodegaService {

    private listaBodegas: [] = [];
    bodegasChanged = new Subject<void>;

    constructor(
        private http: HttpClient
    ) { }

    findAllBodegas() {
        return this.http
            .get<{ 'lista_bodegas': [] }>(
                `${environment.apiUrl}bodegas`
            )
            .pipe(
                tap(response => this.listaBodegas = response.lista_bodegas)
            );
    }

    getBodega(id: number) {
        return this.http.get<any>(
            `${environment.apiUrl}bodegas/${id}`
        );
    }

    addBodega(bodForm: FormGroup) {
        const form = new FormData();
        const formData = bodForm.value;
        Object.keys(formData).forEach((key) => {
            form.append(key, formData[key]);
        });
        this.http.post(
            `${environment.apiUrl}bodegas/nueva`,
            form
        )
            .subscribe({
                next: () => {
                    this.bodegasChanged.next();
                },
                error: (error) => { console.error(error) }
            })
    }

    updateBodega(id: number, modBod: FormGroup) {
        const formData = modBod.value;
        this.http.put(
            `${environment.apiUrl}bodegas/${id}/editar`,
            formData
        ).subscribe({
            next: (response) => {
                console.log(response);
                this.bodegasChanged.next();
            }
        });
    }

    deleteBodega(id: number) {
        this.http
            .delete(
                `${environment.apiUrl}bodegas/${id}/eliminar`
            )
            .subscribe({
                next: () => {
                    this.bodegasChanged.next();
                }
            });
    }
}