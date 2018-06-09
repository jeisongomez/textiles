import { Component, OnInit } from '@angular/core';
import { Ganado } from '../../modelos/ganado';
import { ReportesService } from '../../servicios/reportes.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css'],
  providers: [ReportesService]
})
export class ReportesComponent implements OnInit {

  public ganado: Ganado;
  public dineroGanado: number;
  //public fechaInicioDinero:string;
  //public fechaFinDinero:string;
  public productoMas: number;
  public fechaInicioMas: Date;
  public fechaFinMas: Date;

  public productoMenos: number;
  public fechaInicioMenos: Date;
  public fechaFinMenos: Date;

  public productoUtilidad;
  public respuesta;
  public respuesta2;

  constructor(
    private _reportesService: ReportesService
  ) {
    this.ganado = new Ganado("", "");
    this.dineroGanado = 0;
    //this.fechaInicioDinero = null;
    //this.fechaFinDinero = null;
    this.fechaInicioMas = null;
    this.fechaFinMas = null;
    this.fechaInicioMenos = null;
    this.fechaFinMenos = null;
  }

  ngOnInit() {
  }

  reporteDineroG(){

  	this._reportesService.ganado(this.ganado).subscribe(
      response => {
        this.respuesta = response;
        //console.log(this.respuesta);
        this.respuesta2 = JSON.parse(this.respuesta._body);
        console.log(this.respuesta2);
        if(this.respuesta2.code == 404){
          alert('No es posible obtener el total de ganancias');
        }else{
          this.dineroGanado = this.respuesta2.data['SUM(total_toda_venta)'];
        }
      },
      error => {
        console.log(<any>error);
        alert(<any>error);
      }
    );

  	this.ganado = new Ganado("","");
  }

}
