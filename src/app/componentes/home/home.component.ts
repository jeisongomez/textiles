import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { LoginService } from '../../servicios/login.service';
import { User } from '../../modelos/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [LoginService]
})
export class HomeComponent implements OnInit {

  public validar;


  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _loginService: LoginService,
  ) {
    this.validar = localStorage.getItem('contador');
  }

  ngOnInit() {
    this.refrescar();
    console.log(this.validar);
    //console.log(JSON.parse(localStorage.getItem('usuario')));
  }

  refrescar() {
    if (this.validar == '0') {
      localStorage.setItem('contador', '1');
      location.reload();
    }
  }

}

