import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { GLOBALUSUARIO } from './globalUsuario';

@Injectable()
export class UsuarioService {

  public url: string;

  constructor(
    private _http: Http
  ) { 
    this.url = GLOBALUSUARIO.url;
  }

  addUsuario(usuario){
    let json = JSON.stringify(usuario);
    let params = 'json=' + json;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

    return this._http.post(this.url + 'add-usuario', params, { headers: headers });
  }
}
