import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { GLOBALVENTAS } from './globalVentas';

@Injectable()
export class VentasService {

  public url: string;

  constructor(
    private _http: Http
  ) {
    this.url = GLOBALVENTAS.url;
  }

  addVenta(venta){
    let json = JSON.stringify(venta);
    let params = 'json=' + json;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

    return this._http.post(this.url + 'add-venta', params, { headers: headers });
  }

  addDetalleVenta(venta){
    let json = JSON.stringify(venta);
    let params = 'json=' + json;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

    return this._http.post(this.url + 'add-Detalle-venta', params, { headers: headers });
  }
}
