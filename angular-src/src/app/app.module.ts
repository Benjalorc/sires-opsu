import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SysadminComponent } from './components/sysadmin/sysadmin.component';
import { AdminUnivComponent } from './components/sysadmin/admin-univ/admin-univ.component';
import { AdminCarrComponent } from './components/sysadmin/admin-carr/admin-carr.component';
import { AdminEstComponent } from './components/sysadmin/admin-est/admin-est.component';
import { AdminPnevComponent } from './components/sysadmin/admin-pnev/admin-pnev.component';
import { AdminIndComponent } from './components/sysadmin/admin-ind/admin-ind.component';

import { ValidateService } from './services/validate/validate.service';
import { AuthService } from './services/auth/auth.service';
import { UniversidadesService } from './services/universidades/universidades.service';
import { MunicipiosService } from './services/municipios/municipios.service';
import { CarrerasService } from './services/carreras/carreras.service';
import { PnevsService } from './services/pnevs/pnevs.service';
import { SnisService } from './services/snis/snis.service';
import { EstudiantesService } from './services/estudiantes/estudiantes.service';
import { AuthGuard } from './guards/auth.guard';

const appRoutes : Routes = [
  { path: '', component: HomeComponent},
  { path: 'register', component: RegisterComponent, canActivate:[AuthGuard], data:{ ruta: 'register' } },
  { path: 'login', component: LoginComponent, canActivate:[AuthGuard], data:{ ruta: 'login' } },
  { path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard], data:{ ruta: 'dashboard' } },
  { path: 'profile', component: ProfileComponent, canActivate:[AuthGuard], data:{ ruta: 'profile' } },
  { path: 'admin', component: SysadminComponent, canActivate:[AuthGuard], data:{ ruta: 'admin' } },
  { path: 'admin/universidades', component: AdminUnivComponent, canActivate:[AuthGuard], data:{ ruta: 'universidades' } },
  { path: 'admin/carreras', component: AdminCarrComponent, canActivate:[AuthGuard], data:{ ruta: 'carreras' } },
  { path: 'admin/estudiantes', component: AdminEstComponent, canActivate:[AuthGuard], data:{ ruta: 'estudiantes' } },
  { path: 'admin/pnevs', component: AdminPnevComponent, canActivate:[AuthGuard], data:{ ruta: 'pnevs' } },
  { path: 'admin/indicadores', component: AdminIndComponent, canActivate:[AuthGuard], data:{ ruta: 'indicadores' } }
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    SysadminComponent,
    AdminUnivComponent,
    AdminCarrComponent,
    AdminEstComponent,
    AdminPnevComponent,
    AdminIndComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule
  ],
  providers: [ValidateService, AuthService, AuthGuard, EstudiantesService, UniversidadesService, PnevsService, SnisService, MunicipiosService, CarrerasService],
  bootstrap: [AppComponent]
})
export class AppModule { }
