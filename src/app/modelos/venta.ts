export class Venta {
    constructor(
        public idusuarios: string,
        public idclientes: string,
        public cantidad_productos: string,
        public total_toda_venta: string,
        public tipoPago: string,
        public dias: string
    ) { }
}