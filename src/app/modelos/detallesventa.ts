export class DetallesVenta {
    constructor(
        public productos_codigo_prod: number,
        public productos_idproductos: number,
        public ventas_idventas: number,
        public total_productos: string,
        public total_venta: string
    ) { }
}