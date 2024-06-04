import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { UvaService } from 'src/app/shared/services/uva.service';

@Component({
  selector: 'app-uva-edit',
  templateUrl: './uva-edit.component.html',
  styleUrls: ['./uva-edit.component.scss']
})
export class UvaEditComponent implements OnInit {

  id!: number;
  editMode: boolean = false;
  heading = 'Nueva uva';
  uvaForm!: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private uvaService: UvaService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          if (params['id'] != null) {
            this.id = +params['id'];
            this.editMode = true;
            this.heading = 'Editar uva';
          }
          this.initForm();
        }
      )
  }

  private initForm() {
    this.uvaForm = this.fb.group({
      'id': [null],
      'nombre': ['', Validators.required],
      'descripcion': [null, Validators.required],
      'acidez': [null],
      'dulzor': [null],
      'cuerpo': [null],
      'taninos': [null],
      'abv': [null]
    });

    if (this.editMode) {
      this.uvaService.getUva(this.id)
        .subscribe({
          next: (response) => {
            const uvaRes = response.data;

            this.uvaForm.patchValue({
              'id': this.id,
              'nombre': uvaRes['nombre'],
              'descripcion': uvaRes['descripcion'],
              'acidez': uvaRes['acidez'],
              'dulzor': uvaRes['dulzor'],
              'cuerpo': uvaRes['cuerpo'],
              'taninos': uvaRes['taninos'],
              'abv': uvaRes['abv']
            });
          },
          error: (error) => {
            console.error('Error al obtener la uva:', error);
          }
        })
    }
  }

  onCancel() {
    this.location.back();
  }

  onSubmit() {
    if (this.editMode) {
      this.uvaService.updateUva(this.id, this.uvaForm);
    } else {
      this.uvaService.addUva(this.uvaForm);
    }
    this.uvaService.uvasChanged
      .subscribe({
        next: () => {
          this.router.navigate(['..'], { relativeTo: this.route });
        }
      });
  }
}
