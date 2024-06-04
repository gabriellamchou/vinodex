import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TipoService } from 'src/app/shared/services/tipo.service';

@Component({
  selector: 'app-tipo-list',
  templateUrl: './tipo-list.component.html',
  styleUrls: ['./tipo-list.component.scss']
})
export class TipoListComponent implements OnInit {

  listaTipos: any;

  constructor(
    private tipoService: TipoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.tipoService.findAllTipos()
      .subscribe({
        next: (response) => {
        this.listaTipos = response.lista_tipos;
        this.tipoService.tiposChanged
          .subscribe(() => {
            this.listaTipos = response.lista_tipos;
          })
      }});
  }

  onRowClick(event: any) {
    const id = event.data.id;
    this.router.navigate(['/tipos', id]);
  }

}
