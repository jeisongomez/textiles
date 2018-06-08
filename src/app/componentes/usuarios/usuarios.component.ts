import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Usuario } from '../../modelos/usuario';
import { UsuarioService } from '../../servicios/usuario.service';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
  providers: [UsuarioService]
})
export class UsuariosComponent implements OnInit {

  public usuario: Usuario;
  public ventas = 'NO';
  public compras = 'NO';
  public reportes = 'NO';

  public respuesta;
  public respuesta2;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _usuarioService: UsuarioService
  ) {
    this.usuario = new Usuario('', '', '', '', '', '', '', '', '', '', '', '', '', '');
  }

  ngOnInit() {
  }

  rolventas() {
    if (this.ventas == 'NO') {
      this.ventas = 'SI';
    } else if (this.ventas == 'SI') {
      this.ventas = 'NO';
    }
  };

  rolcompras() {
    if (this.compras == 'NO') {
      this.compras = 'SI';
    } else if (this.compras == 'SI') {
      this.compras = 'NO';
    }
  }

  rolreportes() {
    if (this.reportes == 'NO') {
      this.reportes = 'SI';
    } else if (this.reportes == 'SI') {
      this.reportes = 'NO';
    }
  }

  onSubmit() {
    if (this.ventas == 'NO') {
      this.usuario.ventas = '0';
    } else {
      this.usuario.ventas = '1';
    }

    if (this.compras == 'NO') {
      this.usuario.compras = '0';
    } else {
      this.usuario.compras = '1';
    }

    if (this.reportes == 'NO') {
      this.usuario.reportes = '0';
    } else {
      this.usuario.reportes = '1';
    }

    //console.log(this.usuario);

    this._usuarioService.addUsuario(this.usuario).subscribe(
      response => {
        this.respuesta = response;
        //console.log(this.respuesta);
        this.respuesta2 = JSON.parse(this.respuesta._body);
        if (this.respuesta2.code == 400) {
          alert('El usuario no se pudo crear!!!');
        } else {
          alert('El usuario se creo correctamente!')
          this._router.navigate(['home']);
        }
      },
      error => {
        console.log(<any>error);
        alert(<any>error);
      }
    )

  }

}
