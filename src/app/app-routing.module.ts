import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { LoginFormComponent, ResetPasswordFormComponent, CreateAccountFormComponent, ChangePasswordFormComponent } from './shared/components';
import { AuthGuardService } from './shared/services';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { DxButtonModule, DxDataGridModule, DxFormModule, DxNumberBoxModule, DxSelectBoxModule } from 'devextreme-angular';
import { VinoListComponent } from './pages/vinos/vino-list/vino-list.component';
import { VinoDetailComponent } from './pages/vinos/vino-detail/vino-detail.component';
import { VinoEditComponent } from './pages/vinos/vino-edit/vino-edit.component';
import { UvaListComponent } from './pages/uvas/uva-list/uva-list.component';
import { UvaDetailComponent } from './pages/uvas/uva-detail/uva-detail.component';
import { UvaEditComponent } from './pages/uvas/uva-edit/uva-edit.component';
import { RegionListComponent } from './pages/regiones/region-list/region-list.component';
import { RegionDetailComponent } from './pages/regiones/region-detail/region-detail.component';
import { RegionEditComponent } from './pages/regiones/region-edit/region-edit.component';
import { BodegaListComponent } from './pages/bodegas/bodega-list/bodega-list.component';
import { BodegaDetailComponent } from './pages/bodegas/bodega-detail/bodega-detail.component';
import { BodegaEditComponent } from './pages/bodegas/bodega-edit/bodega-edit.component';
import { TipoListComponent } from './pages/tipos/tipo-list/tipo-list.component';
import { TipoDetailComponent } from './pages/tipos/tipo-detail/tipo-detail.component';
import { TipoEditComponent } from './pages/tipos/tipo-edit/tipo-edit.component';

const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'login-form',
    component: LoginFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'reset-password',
    component: ResetPasswordFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'create-account',
    component: CreateAccountFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'change-password/:recoveryCode',
    component: ChangePasswordFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'vinos',
    component: VinoListComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'vinos/nuevo',
    component: VinoEditComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'vinos/:id',
    component: VinoDetailComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'vinos/:id/editar',
    component: VinoEditComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'uvas',
    component: UvaListComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'uvas/nueva',
    component: UvaEditComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'uvas/:id',
    component: UvaDetailComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'uvas/:id/editar',
    component: UvaEditComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'regiones',
    component: RegionListComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'regiones/nueva',
    component: RegionEditComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'regiones/:id',
    component: RegionDetailComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'regiones/:id/editar',
    component: RegionEditComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'bodegas',
    component: BodegaListComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'bodegas/nueva',
    component: BodegaEditComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'bodegas/:id',
    component: BodegaDetailComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'bodegas/:id/editar',
    component: BodegaEditComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'tipos',
    component: TipoListComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'tipos/nuevo',
    component: TipoEditComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'tipos/:id',
    component: TipoDetailComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'tipos/:id/editar',
    component: TipoEditComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
    routes, 
    { useHash: true }
  ), 
    BrowserModule,
    DxDataGridModule, 
    DxFormModule,
    DxNumberBoxModule,
    DxSelectBoxModule,
    DxButtonModule,
    ReactiveFormsModule
  ],
  providers: [AuthGuardService],
  exports: [RouterModule],
  declarations: [
    HomeComponent,
    ProfileComponent,
    VinoListComponent,
    VinoDetailComponent,
    VinoEditComponent,
    UvaListComponent,
    UvaDetailComponent,
    UvaEditComponent,
    RegionListComponent,
    RegionDetailComponent,
    RegionEditComponent,
    BodegaListComponent,
    BodegaDetailComponent,
    BodegaEditComponent,
    TipoListComponent,
    TipoDetailComponent,
    TipoEditComponent
  ]
})
export class AppRoutingModule { }
