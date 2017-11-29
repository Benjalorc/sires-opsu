import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { LeafletModule } from '@asymmetrik/ngx-leaflet'

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SysadminComponent } from './components/sysadmin/sysadmin.component';
import { AdminUnivComponent } from './components/sysadmin/admin-univ/admin-univ.component';
import { AdminLiceoComponent } from './components/sysadmin/admin-liceo/admin-liceo.component';
import { AdminCarrComponent } from './components/sysadmin/admin-carr/admin-carr.component';
import { AdminEstComponent } from './components/sysadmin/admin-est/admin-est.component';
import { AdminPnevComponent } from './components/sysadmin/admin-pnev/admin-pnev.component';
import { AdminSniComponent } from './components/sysadmin/admin-sni/admin-sni.component';
import { AdminIndComponent } from './components/sysadmin/admin-ind/admin-ind.component';
import { OfertaAcademicaComponent } from './components/sysadmin/admin-ind/oferta-academica/oferta-academica.component';

import { ValidateService } from './services/validate/validate.service';
import { AuthService } from './services/auth/auth.service';
import { UniversidadesService } from './services/universidades/universidades.service';
import { LiceosService } from './services/liceos/liceos.service';
import { MunicipiosService } from './services/municipios/municipios.service';
import { ParroquiasService } from './services/parroquias/parroquias.service';
import { CarrerasService } from './services/carreras/carreras.service';
import { PnevsService } from './services/pnevs/pnevs.service';
import { SnisService } from './services/snis/snis.service';
import { EstudiantesService } from './services/estudiantes/estudiantes.service';
import { IndicadoresService } from './services/indicadores/indicadores.service';

import { AuthGuard } from './guards/auth.guard';
import { ModalCarrerasComponent } from './components/modales/modal-carreras/modal-carreras.component';
import { ModalCarrerasEditarComponent } from './components/modales/modal-carreras-editar/modal-carreras-editar.component';
import { ModalCarrerasEliminarComponent } from './components/modales/modal-carreras-eliminar/modal-carreras-eliminar.component';
import { ModalMensajesImportantesComponent } from './components/modales/modal-mensajes-importantes/modal-mensajes-importantes.component';
import { AdminAsignacionesComponent } from './components/sysadmin/admin-asignaciones/admin-asignaciones.component';
import { ModalUniversidadEliminarComponent } from './components/modales/modal-universidad-eliminar/modal-universidad-eliminar.component';
import { AdminOfertaUnivComponent } from './components/sysadmin/admin-oferta-univ/admin-oferta-univ.component';
import { IndicadoresComponent } from './components/sysadmin/indicadores/indicadores.component';
import { AdminMatriculaUnivComponent } from './components/sysadmin/admin-matricula-univ/admin-matricula-univ.component';
import { ModalMatriculaEgresosComponent } from './components/modales/modal-matricula-egresos/modal-matricula-egresos.component';

const appRoutes : Routes = [
  { path: '', component: HomeComponent},
  { path: 'register', component: RegisterComponent, canActivate:[AuthGuard], data:{ ruta: 'register' } },
  { path: 'login', component: LoginComponent, canActivate:[AuthGuard], data:{ ruta: 'login' } },
  { path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard], data:{ ruta: 'dashboard' } },
  { path: 'profile', component: ProfileComponent, canActivate:[AuthGuard], data:{ ruta: 'profile' } },
  { path: 'admin', component: SysadminComponent, canActivate:[AuthGuard], data:{ ruta: 'admin' } },
  { path: 'admin/universidades', component: AdminUnivComponent, canActivate:[AuthGuard], data:{ ruta: 'universidades' } },
  { path: 'admin/liceos', component: AdminLiceoComponent, canActivate:[AuthGuard], data:{ ruta: 'liceos' } },
  { path: 'admin/carreras', component: AdminCarrComponent, canActivate:[AuthGuard], data:{ ruta: 'carreras' } },
  { path: 'admin/estudiantes', component: AdminEstComponent, canActivate:[AuthGuard], data:{ ruta: 'estudiantes' } },
  { path: 'admin/pnevs', component: AdminPnevComponent, canActivate:[AuthGuard], data:{ ruta: 'pnevs' } },
  { path: 'admin/snis', component: AdminSniComponent, canActivate:[AuthGuard], data:{ ruta: 'snis' } },
  { path: 'admin/asignaciones', component: AdminAsignacionesComponent, canActivate:[AuthGuard], data:{ ruta: 'asignaciones' } },
  { path: 'admin/ofertauniv', component: AdminOfertaUnivComponent, canActivate:[AuthGuard], data:{ ruta: 'ofertauniv' } },
  { path: 'admin/matriculauniv', component: AdminMatriculaUnivComponent, canActivate:[AuthGuard], data:{ ruta: 'matriculauniv' } },
  { path: 'admin/indicadores', component: IndicadoresComponent, canActivate:[AuthGuard], data:{ ruta: 'indicadores' } }
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
    AdminLiceoComponent,
    AdminCarrComponent,
    AdminEstComponent,
    AdminPnevComponent,
    AdminSniComponent,
    AdminIndComponent,
    OfertaAcademicaComponent,
    ModalCarrerasComponent,
    ModalCarrerasEditarComponent,
    ModalCarrerasEliminarComponent,
    ModalMensajesImportantesComponent,
    AdminAsignacionesComponent,
    ModalUniversidadEliminarComponent,
    AdminOfertaUnivComponent,
    IndicadoresComponent,
    AdminMatriculaUnivComponent,
    ModalMatriculaEgresosComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    CollapseModule.forRoot(),
    TooltipModule.forRoot(),
    ButtonsModule.forRoot(),
    ModalModule.forRoot(),
    ProgressbarModule.forRoot(),
    LeafletModule.forRoot(),
    FlashMessagesModule
  ],
  providers: [
    ValidateService, 
    AuthService, 
    AuthGuard, 
    EstudiantesService, 
    UniversidadesService, 
    LiceosService, 
    PnevsService, 
    SnisService, 
    MunicipiosService, 
    ParroquiasService, 
    CarrerasService,
    IndicadoresService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
