import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { Vino } from 'src/app/shared/models/vino.model';
import { VinoService } from 'src/app/shared/services/vino.service';

@Component({
  selector: 'app-vino-detail',
  templateUrl: './vino-detail.component.html',
  styleUrls: ['./vino-detail.component.scss']
})
export class VinoDetailComponent implements OnInit {

  vino!: Vino;
  id!: number;

  constructor(
    private vinoService: VinoService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.vinoService.getVino(this.id)
          .subscribe({
            next: (response) => {
              const vinoRes = response.data;
              this.vino = new Vino(
                vinoRes['Id'],
                vinoRes['Nombre'],
                vinoRes['Precio'],
                {
                  id: vinoRes['RegionId'],
                  nombre: vinoRes['RegionNombre'],
                  pais: vinoRes['RegionPais'],
                  descripcion: vinoRes['RegionDescripcion']
                },
                {
                  id: vinoRes['TipoId'],
                  nombre: vinoRes['TipoNombre'],
                  descripcion: vinoRes['TipoDescripcion']
                },
                {
                  id: vinoRes['BodegaId'],
                  nombre: vinoRes['BodegaNombre'],
                  descripcion: vinoRes['BodegaDescripcion']
                },
                vinoRes['Anada'],
                vinoRes['Alergenos'],
                vinoRes['Graduacion'],
                vinoRes['BreveDescripcion'],
                vinoRes['Capacidad'],
                vinoRes['Stock'],
                {
                  imgAnv: vinoRes['Imagenes'][0] || '',
                  imgRev: vinoRes['Imagenes'][1] || '',
                  imgDet: vinoRes['Imagenes'][2] || '',
                },
                null
              );
            }
          })
      }
    );
  }

  onDeleteVino() {
    this.vinoService.deleteVino(this.id);
    this.vinoService.vinosChanged
      .subscribe(() => {
          this.router.navigate(['..'], { relativeTo: this.route })
        }
      )
  }
}
