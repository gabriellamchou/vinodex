import { Component, OnInit } from '@angular/core';
import { VinoService } from '../../../shared/services/vino.service';
import { Vino } from '../../../shared/models/vino.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-vino-list-old',
  templateUrl: './old-vino-list.component.html',
  styleUrls: ['./old-vino-list.component.css']
})
export class OldVinoListComponent implements OnInit {
  listaVinos!: Vino[];

  constructor(
    private vinoService: VinoService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.vinoService.findAllVinos();
    this.vinoService.vinosChanged
      .subscribe({
        next: (vinos: Vino[]) => {
          this.listaVinos = vinos;
        }
      })
  }

  onDeleteVino(id: number) {
    this.http
      .delete(
        `${environment.apiUrl}vinos/${id}/eliminar`
      )
      .subscribe(
        (response) => {
          console.log(response);
          this.vinoService.deleteVino(id);
        }
      )
  }

}
