import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../modelos/user';
import { LoginService } from '../../servicios/login.service';

@Component({
  selector: 'app-nav-superior',
  templateUrl: './nav-superior.component.html',
  styleUrls: ['./nav-superior.component.css'],
  providers: [LoginService]
})
export class NavSuperiorComponent implements OnInit {

  public logueado;
  public nombreUsuario;
  public apellidoUsuario;
  public cargo;
  public ubicacion;
  public usuario;
  public usuario2;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _loginService: LoginService
  ) {
  }

  ngOnInit() {
    this.obtenerUsusario();
    console.log(this.logueado);
    this.datosUsuario();
  }

  obtenerUsusario() {
    this.logueado = JSON.parse(localStorage.getItem('usuario'));
  }

  datosUsuario() {
    this.nombreUsuario = this.logueado.nombre_pri;
    this.apellidoUsuario = this.logueado.apellido_pri;
    this.cargo = this.logueado.tipo_usuario;
  };

  logout() {
    localStorage.removeItem('usuario');
    this._router.navigate(['/']);
  }

}
