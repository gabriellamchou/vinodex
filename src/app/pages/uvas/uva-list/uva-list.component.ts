import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UvaService } from 'src/app/shared/services/uva.service';

@Component({
  selector: 'app-uva-list',
  templateUrl: './uva-list.component.html',
  styleUrls: ['./uva-list.component.scss']
})
export class UvaListComponent implements OnInit {

  listaUvas: any;

  constructor(
    private uvaService: UvaService,
    private router: Router) { }

  ngOnInit(): void {
    this.uvaService.findAllUvas()
      .subscribe({
        next: (response) => {
        this.listaUvas = response.lista_uvas;
        this.uvaService.uvasChanged
          .subscribe(() => {
            this.listaUvas = response.lista_uvas;
          })
      }});
  }

  onRowClick(event: any) {
    const id = event.data.id;
    this.router.navigate(['/uvas', id]);
  }

}
