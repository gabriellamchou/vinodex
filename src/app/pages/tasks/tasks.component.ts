import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import 'devextreme/data/odata/store';
import { environment } from 'src/environments/environment';

@Component({
  templateUrl: 'tasks.component.html'
})

export class TasksComponent {
  dataSource: any;

  constructor(private http: HttpClient) {
      this.http.get<any>(`${environment.apiUrl}vinos`).subscribe(data => {
        this.dataSource = data.lista_vinos;
      });
  }
}
