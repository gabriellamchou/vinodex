import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TipoService } from 'src/app/shared/services/tipo.service';

@Component({
  selector: 'app-tipo-edit',
  templateUrl: './tipo-edit.component.html',
  styleUrls: ['./tipo-edit.component.scss']
})
export class TipoEditComponent implements OnInit {

  id!: number;
  editMode: boolean = false;
  heading = 'Nuevo tipo';
  tipoForm!: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private tipoService: TipoService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          if (params['id'] != null) {
            this.id = +params['id'];
            this.editMode = true;
            this.heading = 'Editar tipo';
          }
          this.initForm();
        }
      )
  }

  private initForm() {
    this.tipoForm = this.fb.group({
      'id': null,
      'nombre': ['', Validators.required],
      'descripcion': [null, Validators.required]
    });

    if (this.editMode) {
      this.tipoService.getTipo(this.id)
        .subscribe({
          next: (response) => {
            const uvaRes = response.data;

            this.tipoForm.patchValue({
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
      this.tipoService.updateTipo(this.id, this.tipoForm);
    } else {
      this.tipoService.addTipo(this.tipoForm);
    }
    this.tipoService.tiposChanged
      .subscribe({
        next: () => {
          this.router.navigate(['..'], { relativeTo: this.route });
        }
      });
  }

}
