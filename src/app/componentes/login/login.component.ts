import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../modelos/user';
import { LoginService } from '../../servicios/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  public usuario: User;
  public identity;
  public identity2;
  public respuesta;
  public teclado;
  public datosUsuario;
  public prueba;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _loginService: LoginService
  ) {
    this.usuario = new User(null, '', '');
  }

  ngOnInit() {
    console.log('componente login ejecutado');
  }



  onSubmit() {
    this._loginService.signup(this.usuario).subscribe(
      response => {
        this.identity = response;
        this.identity2 = JSON.parse(this.identity._body);
        //console.log(this.identity2);
        if (this.identity2.code == 400) {
          this.respuesta = this.identity2.message;
          this.usuario.id = null;
          this.usuario.nombreUsuario = '';
          this.usuario.contrasena = '';
        } else {
          this.respuesta = '';
          this.datosUsuario = this.identity2.data;
          this.usuario.id = this.identity2.data.idusuarios;
          //console.log(this.usuario);
          localStorage.setItem('contador', '0');
          localStorage.setItem('usuario', JSON.stringify(this.datosUsuario));
          this._router.navigate(['home']);
          //console.log(this.datosUsuario);
        }
      },
      error => {
        console.log(<any>error);
        alert(<any>error);
      }
    )
  }

}
