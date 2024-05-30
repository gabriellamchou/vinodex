import { Injectable } from '@angular/core';
import { Uva } from '../models/uva.model';

@Injectable({
  providedIn: 'root'
})
export class UvaService {

  private listaUvas = [
    new Uva(
      1,
      'Monastrell',
      'La uva monastrell es la gran tinta del levante español, una uva que adora el sol y consigue progresar con cantidades moderadas de agua.',
      100,
      null, 
      null, 
      null, 
      null, 
      null
    ),
    new Uva(
      2,
      'Mencía',
      'La mencía es la uva tinta estrella del noroeste español y la responsable del auge de pequeñas denominaciones de origen como El Bierzo y La Ribeira Sacra.',
      100,
      null, 
      null, 
      null, 
      null, 
      null
    ),
    new Uva(
      3,
      'Tempranillo',
      'La tempranillo es la gran uva tinta de España, la variedad en la que se basan los vinos de algunas de las denominaciones españolas de mayor prestigio, como Rioja, Ribera del Duero o Toro. En Toro, es conocida como Tinta de Toro y en Ribera del Duero como Tinta del país o tinto fino.',
      100,
      50, 
      25, 
      70, 
      65, 
      70
    ),
    new Uva(
      4,
      'Garnacha',
      'La variedad garnacha (grenache en francés) es una uva tinta cultivada ampliamente en España, Francia, Australia y en los Estados Unidos. Se trata de una planta versátil, capaz de adaptarse a una infinidad de terruños distintos, en los que muestra un perfil diferenciado sin perder en absoluto su esencia.',
      100,
      70, 
      40, 
      70, 
      65, 
      90
    )
  ]

  constructor() { }

  getListaUvas() {
    return this.listaUvas;
  }

  getUva(id: number) {
    return this.listaUvas.find(
      (uva) => uva.id === id
    )
  }
}
