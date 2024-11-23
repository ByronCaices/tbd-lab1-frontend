export interface DetalleOrden {
    id_detalle: number;
    cantidad: number;
    precio: number;
    id_producto: number;
    id_orden: number;
}