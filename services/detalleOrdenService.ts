
import { useNuxtApp } from "#app";
import type { DetalleOrden } from "@/models/detalleOrden";
import type { Devolucion } from "@/models/devolucion";

export const useDetalleOrdenService = () => {
    const { $axiosService } = useNuxtApp();

    const getDetalleOrden = async (id: number): Promise<DetalleOrden> => {
        const response = await $axiosService.get(`/api/detalleordenes/${id}`);
        return response.data;
    };

    const getDetallesByOrderId = async (id: number): Promise<DetalleOrden[]> => {
        const response = await $axiosService.get(`/api/detalleordenes/id-orden/${id}`);
        return response.data;
    };

    const gestionarDevolucion = async (devolucion: Devolucion): Promise<DetalleOrden> => {
        const response = await $axiosService.post("/api/detalleordenes/gestionarDevolucion", devolucion);
        return response.data
    };

    const deleteDetalleOrden = async (id: number): Promise<void> => {
        await $axiosService.delete(`/api/detalleordenes/delete-detalle/${id}`);
    };

    return {
        getDetalleOrden,
        getDetallesByOrderId,
        gestionarDevolucion,
        deleteDetalleOrden,
    };
}