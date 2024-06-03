import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent, ResetPasswordFormComponent, CreateAccountFormComponent, ChangePasswordFormComponent } from './shared/components';
import { AuthGuardService } from './shared/services';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { DxButtonModule, DxDataGridModule, DxFormModule, DxNumberBoxModule, DxSelectBoxModule } from 'devextreme-angular';
import { VinoListComponent } from './pages/vino-list/vino-list.component';
import { VinoDetailComponent } from './pages/vino-detail/vino-detail.component';
import { VinoEditComponent } from './pages/vino-edit/vino-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { UvaListComponent } from './pages/uva-list/uva-list.component';

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
    UvaListComponent
  ]
})
export class AppRoutingModule { }
