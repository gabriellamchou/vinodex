import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BodegaService } from 'src/app/shared/services/bodega.service';

@Component({
  selector: 'app-bodega-list',
  templateUrl: './bodega-list.component.html',
  styleUrls: ['./bodega-list.component.scss']
})
export class BodegaListComponent implements OnInit {

  listaBodegas: any;

  constructor(
    private bodegaService: BodegaService,
    private router: Router) { }

  ngOnInit(): void {
    this.bodegaService.findAllBodegas()
      .subscribe({
        next: (response) => {
        this.listaBodegas = response.lista_bodegas;
        this.bodegaService.bodegasChanged
          .subscribe(() => {
            this.listaBodegas = response.lista_bodegas;
          })
      }});
  }

  onRowClick(event: any) {
    const id = event.data.id;
    this.router.navigate(['/bodegas', id]);
  }

}
