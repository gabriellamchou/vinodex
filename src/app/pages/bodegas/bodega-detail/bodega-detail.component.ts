import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Bodega } from 'src/app/shared/models/bodega.model';
import { BodegaService } from 'src/app/shared/services/bodega.service';

@Component({
  selector: 'app-bodega-detail',
  templateUrl: './bodega-detail.component.html',
  styleUrls: ['./bodega-detail.component.scss']
})
export class BodegaDetailComponent implements OnInit {

  bodega!: Bodega;
  id!: number;

  constructor(
    private bodegaService: BodegaService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.bodegaService.getBodega(this.id)
          .subscribe({
            next: (response) => {
              console.log(response);
              
              const bodRes = response.data;
              this.bodega = new Bodega(
                bodRes['id'],
                bodRes['nombre'],
                bodRes['descripcion']
              );
            }
          });
      }
    );
  }

  onDeleteBodega() {
    this.bodegaService.deleteBodega(this.id);
    this.bodegaService.bodegasChanged
      .subscribe(() => {
        this.router.navigate(['..'], { relativeTo: this.route });
      });
  }

}
