import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Producto } from '../../modelos/producto';
import { Proveedor } from '../../modelos/proveedor';
import { ComprasService } from '../../servicios/compras.service';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css'],
  providers: [ComprasService]
})
export class ComprasComponent implements OnInit {

  public poducto: Producto;
  public prov: Proveedor;

  public codigo: string;
  public proveedorC: string;
  public nombre: string;
  public presentacion: string;
  public cantidad: string;
  public precio: string;

  public newProveedor: boolean;

  public nombreProv: string;
  public apellidoProv: string;

  public respuestaProducto;
  public respuestaProducto2;

  public respuestaProveedor;
  public respuestaProveedor2;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _comprasService: ComprasService
  ) {
    this.poducto = new Producto("", "", "", "", "", "");
    this.prov = new Proveedor("", "", "", "")
    this.newProveedor = false;
  }

  ngOnInit() {
  }

  addProducto() {
    this.poducto = new Producto(this.codigo, this.proveedorC, this.nombre, this.presentacion, this.cantidad, this.precio);
    //console.log(this.poducto);
    this._comprasService.addProducto(this.poducto).subscribe(

      response => {
        this.respuestaProducto = response;
        console.log(this.respuestaProducto);
        //alert('entre producto');
        this.respuestaProducto2 = JSON.parse(this.respuestaProducto._body);
        if (this.respuestaProducto2.code == 404) {
          alert('El producto no pudo ser agregado');
        } else {
          alert('El producto fue agregado correctamente');
          this._router.navigate(['home']);
        }
      },
      error => {
        console.log(<any>error);
      }

    );

    this.poducto = new Producto("", "", "", "", "", "");
  }


  addProveedor() {

    this.prov.nombre_proveedor = this.nombreProv + " " + this.apellidoProv;
    console.log(this.prov);

    this._comprasService.addProveedor(this.prov).subscribe(

      response => {
        this.respuestaProveedor = response;
        console.log(this.respuestaProveedor);
        //alert('entre proveedor');
        this.respuestaProveedor2 = JSON.parse(this.respuestaProveedor._body);
        if (this.respuestaProveedor2.code == 404) {
          alert('El proveedor no se pudo adicionar');
        } else {
          alert('Proveedor adicionado correctamente')
          this.newProveedor = false;
        }
      },
      error => {
        console.log(<any>error);
      }

    );

    this.nombreProv = "";
    this.apellidoProv = "";
    this.prov = new Proveedor("", "", "", "")
    this.newProveedor = false;

  }

}
