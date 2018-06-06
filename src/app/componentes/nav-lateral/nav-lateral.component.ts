import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../servicios/login.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../modelos/user';

@Component({
  selector: 'app-nav-lateral',
  templateUrl: './nav-lateral.component.html',
  styleUrls: ['./nav-lateral.component.css'],
  providers: [LoginService]
})
export class NavLateralComponent implements OnInit {

  public logueado;
  public ventas;
  public compras;
  public reportes;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _loginService: LoginService
  ) { }

  ngOnInit() {
    this.obtenerRoles();
  }

  obtenerUsusario() {
    this.logueado = JSON.parse(localStorage.getItem('usuario'));
    console.log(this.logueado);
  };

  obtenerRoles() {
    this.obtenerUsusario();
    this.ventas = this.logueado.ventas;
    this.compras = this.logueado.compras;
    this.reportes = this.logueado.reportes;
  };

}
