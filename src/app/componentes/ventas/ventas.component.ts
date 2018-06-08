import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../modelos/cliente';
import { Venta } from '../../modelos/venta';
import { DetallesVenta } from '../../modelos/detallesventa';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ClienteService } from '../../servicios/cliente.service';
import { ProductoService } from '../../servicios/producto.service';
import { VentasService } from '../../servicios/ventas.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css'],
  providers: [ClienteService, ProductoService, VentasService]
})
export class VentasComponent implements OnInit {

  public cliente: Cliente;
  public respuesta;
  public respuesta2;
  public crear;
  public vender;
  public newCliente;
  public productos;
  public productos2;
  public usuario;

  public data: any[];
  public filterQuery = "";
  public rowsOnPage = 5;
  public sortBy = "email";
  public sortOrder = "asc";

  public order = [];
  public itemsCnt = 1;
  public tipo_pago = '';
  public seleccionarDias = false;
  public dia = '';
  public venta;
  public totalProductosVenta = 0;
  public res;
  public res2;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _clienteService: ClienteService,
    private _productoService: ProductoService,
    private _ventasService: VentasService
  ) {
    this.cliente = new Cliente('', '', '', '', '', '', '', '');
    this.venta = new Venta('', '', '', '', '', '');
  }

  ngOnInit() {
    this.productosList();
    this.obtenerUsuario();
  }

  productosList() {
    this._productoService.obtenerProductos().subscribe(
      response => {
        this.productos = response;
        this.productos2 = JSON.parse(this.productos._body);
        console.log(this.productos2);
        if (this.productos2.code == 200) {
          this.data = this.productos2.data;
        } else {
          alert('No es posible traer los productos');
        }
      },
      error => {
        console.log(<any>error);
        alert(<any>error);
      }
    )
  }

  obtenerUsuario() {
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
    //console.log(this.usuario);
  }

  crearNew() {
    this._router.navigate(['addCliente']);
  }

  onSubmit() {
    this._clienteService.verificarCliente(this.cliente).subscribe(
      response => {
        this.respuesta = response;
        this.respuesta2 = JSON.parse(this.respuesta._body);
        //console.log(this.respuesta2);
        if (this.respuesta2.code == 200) {
          this.vender = '0';
          this.crear = '1';
        } else {
          this.crear = '0';
          this.vender = '1';
          this.newCliente = this.respuesta2.data;
          //console.log(this.newCliente);
        }
      },
      error => {
        console.log(<any>error);
        alert(<any>error);
      }
    )
  }

  add(item) {
    //console.log(precio);
    let orderedItemCnt = 1;
    var foodItem = {
      orderedItemCnt: 1,
      totalPrice: parseInt(item.precio_venta),
      itemId: item.idproductos,
      id: this.itemsCnt,
      item: item
    };

    var cartItems = this.order.filter((element) => {
      return (element.itemId == item.idproductos);
    });
    console.log("cartItems " + JSON.stringify(cartItems));

    if (cartItems.length > 0 && this.order) {
      cartItems[0].orderedItemCnt = ++cartItems[0].orderedItemCnt;
      cartItems[0].totalPrice = parseInt(item.precio_venta) * cartItems[0].orderedItemCnt;
    }
    else {
      this.order.push(foodItem);
      this.itemsCnt = this.order.length;
    }
    localStorage.setItem("order", JSON.stringify(this.order));
    //console.log(JSON.stringify(this.order));

  };

  subtractItem = function (item, $index) {
    if (item.orderedItemCnt > 1) {
      item.orderedItemCnt = --item.orderedItemCnt;
      item.totalPrice = parseInt(item.item.precio_venta) * item.orderedItemCnt;
      localStorage.setItem("order", JSON.stringify(this.order));
    }
    else {
      this.isDisabled = true;
      // isDisabled = false;    
      // $("#SubstractItemBtn").prop("disabled", true);
    }
  }

  addItem = function (item, index) {
    console.log(JSON.stringify(item) + " " + index);
    item.orderedItemCnt = ++item.orderedItemCnt;
    item.totalPrice = parseInt(item.item.precio_venta) * item.orderedItemCnt;
    localStorage.setItem("order", JSON.stringify(this.order));
  };

  deleteItem = function (index) {
    this.order.splice(index, 1);
    localStorage.setItem("order", JSON.stringify(this.order));
  };

  getSum() {
    var i = 0, sum = 0;
    for (; i < this.order.length; i++) {
      sum += parseInt(this.order[i].totalPrice);
    }
    return sum;
  };

  tipoPagoContado() {
    this.seleccionarDias = false;
    this.tipo_pago = 'contado';
  }

  tipoPagoCredito() {
    this.tipo_pago = '';
    this.seleccionarDias = true;
  }

  treintaDias() {
    this.tipo_pago = 'credito';
    this.dia = '30';
  }

  sesentaDias() {
    this.tipo_pago = 'credito';
    this.dia = '60';
  }

  noventaDias() {
    this.tipo_pago = 'credito';
    this.dia = '90';
  }

  prueba() {
    console.log(this.order);
    this.cantidadesTotales();
    console.log(this.totalProductosVenta.toString());
  }

  cantidadesTotales() {
    for (let i = 0; i < this.order.length; i++) {
      this.totalProductosVenta += this.order[i].orderedItemCnt;
    }
  }

  detallesVenta(id) {
    let ordensirijilla = JSON.parse(localStorage.getItem("order"));
    let statusirijillo = true;

    for (var i in ordensirijilla) {
      //console.log(ordensirijilla[i].orderedItemCnt + " " + ordensirijilla[i].totalPrice);  // (o el campo que necesites)
      let productirijillo = ordensirijilla[i].item;
      console.log(productirijillo);
      productirijillo.cant_dispon = (productirijillo.cant_dispon - ordensirijilla[i].orderedItemCnt);

      let detalles_venta = new DetallesVenta(parseInt(productirijillo.codigo_prod), parseInt(productirijillo.idproductos), parseInt(id), (ordensirijilla[i].orderedItemCnt).toString(), (ordensirijilla[i].totalPrice).toString());
      this._ventasService.addDetalleVenta(detalles_venta).subscribe(
        response => {
          console.log("uy no lo puedo creer!! " + JSON.stringify(productirijillo));
          this._productoService.update(productirijillo).subscribe(
            response => {
              alert("La Venta Se Realizo Correctamente!");
              this._router.navigate(['home']);
            },
            error => {
              console.log(<any>error);
              alert(<any>error);
            }
          )
        }, error => {
          statusirijillo = false;
        }
      );
    }
  }

  checkout() {
    console.log(JSON.stringify(this.order));
    console.log(this.order);
    if (this.tipo_pago == 'contado') {
      this.dia = '0';
    }
    var idVentaRealizada;
    this.cantidadesTotales();
    var sumatotal = this.getSum().toString();
    this.venta = new Venta(this.usuario.idusuarios,
      this.newCliente.idclientes,
      this.totalProductosVenta.toString(),
      sumatotal,
      this.tipo_pago,
      this.dia);
    console.log(this.venta);
    this._ventasService.addVenta(this.venta).subscribe(
      response => {
        this.res = response;
        //console.log(this.res);
        this.res2 = JSON.parse(this.res._body);
        //console.log(this.res2);
        if (this.res2.code == 400) {
          alert('La venta no pudo ser realizada');
        } else {
          idVentaRealizada = this.res2.data.idventas;
          //console.log(idVentaRealizada);
          this.detallesVenta(idVentaRealizada);
        }
      },
      error => {
        console.log(<any>error);
        alert(<any>error);
      }
    )
  };

}
