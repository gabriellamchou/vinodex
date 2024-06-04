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
    RegionListComponent
  ]
})
export class AppRoutingModule { }
