import { Component } from '@angular/core';
import { Router } from '@angular/router';

import 'devextreme/data/odata/store';
import { VinoService } from 'src/app/shared/services/vino.service';

@Component({
  templateUrl: 'vino-list.component.html',
  styleUrls: ['./vino-list.component.scss']
})

export class VinoListComponent {
  listaVinos: any;

  constructor(
    private vinoService: VinoService,
    private router: Router) {
      this.vinoService.findAllVinos()
        .subscribe(response => {
          this.listaVinos = response.lista_vinos;
          this.vinoService.vinosChanged
            .subscribe(() => {
              this.listaVinos = response.lista_vinos;
            })
        });
  }

  onRowClick(event: any) {
    const id = event.data.Id;
    this.router.navigate(['vinos', id]);
  }
}
