import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
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

    deleteBodega(id: number) {
        console.log("El método deleteBodega todavía no está desarrollado");
    }
}