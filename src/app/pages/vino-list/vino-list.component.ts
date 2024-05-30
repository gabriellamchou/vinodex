import { Component } from '@angular/core';
import { Router } from '@angular/router';

import 'devextreme/data/odata/store';
import { VinoService } from 'src/app/shared/services/vino.service';

@Component({
  templateUrl: 'vino-list.component.html',
  styleUrls: ['./vino-list.component.css']
})

export class VinoListComponent {
  dataSource: any;

  constructor(
    private vinoService: VinoService,
    private router: Router) {
      this.vinoService.findAllVinos()
        .subscribe(data => {
          this.dataSource = data.lista_vinos;
        });
  }

  onRowClick(event: any) {
    const id = event.data.Id;
    this.router.navigate(['vinos', id]);
  }
}
