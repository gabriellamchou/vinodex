import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, tap } from "rxjs";

import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class RegionService {

    listaRegiones: [] = [];
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
}