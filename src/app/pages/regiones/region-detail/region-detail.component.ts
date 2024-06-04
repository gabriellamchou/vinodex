import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { Region } from 'src/app/shared/models/region.model';
import { RegionService } from 'src/app/shared/services/region.service';

@Component({
  selector: 'app-region-detail',
  templateUrl: './region-detail.component.html',
  styleUrls: ['./region-detail.component.scss']
})
export class RegionDetailComponent implements OnInit {

  region!: Region;
  id!: number;

  constructor(
    private regionService: RegionService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.regionService.getRegion(this.id)
          .subscribe({
            next: (response) => {
              const regRes = response.data;
              this.region = new Region(
                regRes['id'],
                regRes['nombre'],
                regRes['pais'],
                regRes['descripcion']
              );
            }
          });
      }
    );
  }

  onDeleteRegion() {
    this.regionService.deleteRegion(this.id);
    this.regionService.regionesChanged
      .subscribe(() => {
        this.router.navigate(['..'], { relativeTo: this.route });
      });
  }

}
