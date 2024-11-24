import { useNuxtApp } from '#app';
import type { DetalleOrden } from '@/models/detalleOrden';

export const useOrdenService = () => {
    const { $axiosService } = useNuxtApp();

    /**
     * Crea una nueva orden de detalle.
     * @param detalleOrden - Detalle de la orden a crear.
     * @returns El detalle de la orden creada.
     */
    const createDetalleOrden = async (detalleOrden: DetalleOrden): Promise<DetalleOrden> => {
        const { data } = await $axiosService.post('/ordenes/', detalleOrden);
        return data;
    };

    /**
     * Obtiene un detalle de la orden por su ID.
     * @param id - ID del detalle de la orden.
     * @param token - Token de autenticación.
     * @returns El detalle de la orden.
     */
    const getDetalleOrdenById = async (id: number, token: string): Promise<DetalleOrden> => {
        try {
            const { data } = await $axiosService.get<DetalleOrden>(`/ordenes/id-orden/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return data;
        } catch (error) {
            console.error('Error obteniendo el detalle de la orden:', error);
            throw error;
        }
    };

    /**
     * Obtiene todos los detalles de las ordenes.
     * @param token - Token de autenticación.
     * @returns Una lista de todos los detalles de las ordenes.
     */
    const getAllDetalleOrdenes = async (token: string): Promise<DetalleOrden[]> => {
        const { data } = await $axiosService.get<DetalleOrden[]>('/ordenes/', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return data;
    };

    /**
     * Actualiza un detalle de orden.
     * @param detalleOrden - El detalle la orden que se actualizará.
     * @param token - Token de autenticación.
     * @returns El detalle de la orden actualizado.
     */
    const updateDetalleOrden = async (detalleOrden: DetalleOrden, token: string): Promise<DetalleOrden> => {
        const { data } = await $axiosService.put<DetalleOrden>(`/ordenes/`, detalleOrden, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return data;
    };

    /**
     * Elimina un detalle de la orden por su ID.
     * @param id - ID de la orden a eliminar.
     * @param token - Token de autenticación.
     * @returns - Eliminación de la orden.
     */
    const deleteDetalleOrdenById = async (id: number, token: string): Promise<void> => {
        try {
            await $axiosService.delete(`/ordenes/delete-orden/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        } catch (error) {
            console.error('Error eliminando el detalle de la orden:', error);
            throw error;
        }
    };

    return {
        createDetalleOrden,
        getDetalleOrdenById,
        getAllDetalleOrdenes,
        updateDetalleOrden,
        deleteDetalleOrdenById,
    };
};