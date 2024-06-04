import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BodegaService } from 'src/app/shared/services/bodega.service';

@Component({
  selector: 'app-bodega-edit',
  templateUrl: './bodega-edit.component.html',
  styleUrls: ['./bodega-edit.component.scss']
})
export class BodegaEditComponent implements OnInit {

  id!: number;
  editMode: boolean = false;
  heading = 'Nueva bodega';
  bodegaForm!: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private bodegaService: BodegaService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          if (params['id'] != null) {
            this.id = +params['id'];
            this.editMode = true;
            this.heading = 'Editar bodega';
          }
          this.initForm();
        }
      )
  }

  private initForm() {
    this.bodegaForm = this.fb.group({
      'id': [null, Validators.required],
      'nombre': ['', Validators.required],
      'descripcion': [null, Validators.required]
    });

    if (this.editMode) {
      this.bodegaService.getBodega(this.id)
        .subscribe({
          next: (response) => {
            const uvaRes = response.data;

            this.bodegaForm.patchValue({
              'id': this.id,
              'nombre': uvaRes['nombre'],
              'descripcion': uvaRes['descripcion']
            });
          },
          error: (error) => {
            console.error('Error al obtener la bodega:', error);
          }
        })
    }
  }

  onCancel() {
    this.location.back();
  }

  onSubmit() {
    if (this.editMode) {
      this.bodegaService.updateBodega(this.id, this.bodegaForm);
    } else {
      this.bodegaService.addBodega(this.bodegaForm);
    }
    this.bodegaService.bodegasChanged
      .subscribe({
        next: () => {
          this.router.navigate(['..'], { relativeTo: this.route });
        }
      });
  }

}
