import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Tipo } from 'src/app/shared/models/tipo.model';
import { TipoService } from 'src/app/shared/services/tipo.service';

@Component({
  selector: 'app-tipo-detail',
  templateUrl: './tipo-detail.component.html',
  styleUrls: ['./tipo-detail.component.scss']
})
export class TipoDetailComponent implements OnInit {

  tipo!: Tipo;
  id!: number;

  constructor(
    private tipoService: TipoService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.tipoService.getTipo(this.id)
          .subscribe({
            next: (response) => {
              const tipoRes = response.data;
              this.tipo = new Tipo(
                tipoRes['id'],
                tipoRes['nombre'],
                tipoRes['descripcion']
              );
            }
          });
      }
    );
  }

  onDeleteTipo() {
    this.tipoService.deleteTipo(this.id);
    this.tipoService.tiposChanged
      .subscribe(() => {
        this.router.navigate(['..'], { relativeTo: this.route });
      });
  }

}
