import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { GLOBALCOMPRAS } from './globalCompras';

@Injectable()
export class ComprasService {

  public url: string;

  constructor(
    private _http: Http
  ) {
    this.url = GLOBALCOMPRAS.url;
  }

  addProducto(producto) {
    let json = JSON.stringify(producto);
    //console.log(json);
    let params = 'json=' + json;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

    return this._http.post(this.url + 'productos', params, { headers: headers });
  }

  addProveedor(proveedor) {
    let json = JSON.stringify(proveedor);
    //console.log(json);
    let params = 'json=' + json;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

    return this._http.post(this.url + 'proveedores', params, { headers: headers });
  }
}
