import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Componentes
import { LoginComponent } from './componentes/login/login.component';
import { HomeComponent } from './componentes/home/home.component';
import { ErrorComponent } from './componentes/error/error.component';
import { NavSuperiorComponent } from './componentes/nav-superior/nav-superior.component';
import { VentasComponent } from './componentes/ventas/ventas.component';
import { ClientesComponent } from './componentes/clientes/clientes.component';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { ComprasComponent } from './componentes/compras/compras.component';
import { ReportesComponent } from './componentes/reportes/reportes.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'ventas', component: VentasComponent },
  { path: 'addCliente', component: ClientesComponent },
  { path: 'addUsuario', component: UsuariosComponent },
  { path: 'compras', component: ComprasComponent },
  { path: 'reportes', component: ReportesComponent},
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }