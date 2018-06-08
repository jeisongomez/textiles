export class Usuario {
    constructor(
        public tipo_usuario: string,
        public nombre_pri: string,
        public nombre_seg: string,
        public apellido_pri: string,
        public apellido_seg: string,
        public num_identidad: string,
        public telefono: string,
        public direccion: string,
        public correo: string,
        public ventas: string,
        public compras: string,
        public reportes: string,
        public usuario: string,
        public contrasena: string
    ) { }
}