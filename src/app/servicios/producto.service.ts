import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { GLOBALPRODUCTOS } from './globalProductos';

@Injectable()
export class ProductoService {

  public url: string;

  constructor(
    private _http: Http
  ) {
    this.url = GLOBALPRODUCTOS.url;
  }

  obtenerProductos(){
    return this._http.get(this.url + 'productos');
  }

  update(producto){
    let json = JSON.stringify(producto);
    let params = 'json=' + json;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

    return this._http.post(this.url + 'update-producto', params, { headers: headers });
  }

}
