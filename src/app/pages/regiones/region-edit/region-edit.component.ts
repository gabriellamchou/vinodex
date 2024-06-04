import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { RegionService } from 'src/app/shared/services/region.service';

@Component({
  selector: 'app-region-edit',
  templateUrl: './region-edit.component.html',
  styleUrls: ['./region-edit.component.scss']
})
export class RegionEditComponent implements OnInit {

  id!: number;
  editMode: boolean = false;
  heading = 'Nueva región';
  regionForm!: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private regionService: RegionService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          if (params['id'] != null) {
            this.id = +params['id'];
            this.editMode = true;
            this.heading = 'Editar región';
          }
          this.initForm();
        }
      )
  }

  private initForm() {
    this.regionForm = this.fb.group({
      'id': [null],
      'nombre': ['', Validators.required],
      'pais': ['', Validators.required],
      'descripcion': [null, Validators.required]
    });

    if (this.editMode) {
      this.regionService.getRegion(this.id)
        .subscribe({
          next: (response) => {
            const uvaRes = response.data;

            this.regionForm.patchValue({
              'id': this.id,
              'nombre': uvaRes['nombre'],
              'pais': uvaRes['pais'],
              'descripcion': uvaRes['descripcion']
            });
          },
          error: (error) => {
            console.error('Error al obtener la región:', error);
          }
        })
    }
  }

  onCancel() {
    this.location.back();
  }

  onSubmit() {
    if (this.editMode) {
      this.regionService.updateRegion(this.id, this.regionForm);
    } else {
      this.regionService.addRegion(this.regionForm);
    }
    this.regionService.regionesChanged
      .subscribe({
        next: () => {
          this.router.navigate(['..'], { relativeTo: this.route });
        }
      });
  }
}
