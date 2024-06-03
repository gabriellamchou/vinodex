import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Uva } from 'src/app/shared/models/uva.model';
import { UvaService } from 'src/app/shared/services/uva.service';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-uva-detail',
  templateUrl: './uva-detail.component.html',
  styleUrls: ['./uva-detail.component.scss']
})
export class UvaDetailComponent implements OnInit {

  uva!: Uva;
  id!: number;

  constructor(
    private uvaService: UvaService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.http.get<any>(
          `${environment.apiUrl}uvas/${this.id}`
        )
          .subscribe({
            next: (response) => {
              const uvaRes = response.data;
              this.uva = new Uva(
                uvaRes['id'],
                uvaRes['nombre'],
                uvaRes['descripcion'],
                0,
                uvaRes['acidez'],
                uvaRes['dulzor'],
                uvaRes['cuerpo'],
                uvaRes['taninos'],
                uvaRes['abv'],
              );
            }
        })
      }
    );
  }

  onDeleteUva() {
    this.http
      .delete(
        `${environment.apiUrl}uvas/${this.id}/eliminar`
      )
      .subscribe(
        (response: any) => {
          console.log(response);
          this.uvaService.deleteUva(this.id);
          this.router.navigate(['..'], {relativeTo: this.route})
        }
      )
  }
}
