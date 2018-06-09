import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { GLOBALREPORTES } from './globalReportes';

@Injectable()
export class ReportesService {

  public url: string;

  constructor(
    private _http: Http
  ) {
    this.url = GLOBALREPORTES.url;
  }

  ganado(ganado) {
    let json = JSON.stringify(ganado);
    //console.log(json);
    let params = 'json=' + json;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

    return this._http.post(this.url + 'ganado', params, { headers: headers });
  }

}
