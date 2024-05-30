import { Component } from '@angular/core';

import 'devextreme/data/odata/store';
import { VinoService } from 'src/app/shared/services/vino.service';

@Component({
  templateUrl: 'vino-list.component.html',
  styleUrls: ['./vino-list.component.css']
})

export class VinoListComponent {
  dataSource: any;

  constructor(private vinoService: VinoService) {
      this.vinoService.findAllVinos()
        .subscribe(data => {
          this.dataSource = data.lista_vinos;
        });
  }
}
