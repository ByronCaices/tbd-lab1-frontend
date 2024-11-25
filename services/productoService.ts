import { useNuxtApp } from "#app";
import type { Producto } from "@/models/producto";
export const useProductoService = () => {
    const { $axiosService } = useNuxtApp();
    /**
     * Permite crear un nuevo producto.
     * @param producto - Producto a crear.
     * @returns - El producto creado en la base de datos.
     */
    const createProducto = async (producto: Producto): Promise<Producto> => {
        const { data } = await $axiosService.post('/api/productos/', producto);
        return data;
    };
    /**
     * Obtiene todos los productos.
     * @param token - Token de autenticación.
     * @returns - Una lista de todos los productos.
     */
    const getAllProductos = async (token: string): Promise<Producto[]> => {
        const { data } = await $axiosService.get<Producto[]>('/api/productos/', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return data;
    };
    /**
     * Obtiene un producto por su ID.
     * @param id - ID del producto.
     * @param token - Token de autenticación.
     * @returns - El producto correspondiente al ID proporcionado.
     */
    const getProductoById = async (id: number, token: string): Promise<Producto> => {
        try {
            const { data } = await $axiosService.get<Producto>(`/api/productos/id-producto/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return data;
        } catch (error) {
            console.error('Error obteniendo el producto por ID:', error);
            throw error;
        }
    };
    /**
     * Actualiza un producto.
     * @param producto - Producto a actualizar.
     * @param token - Token de autenticación.
     * @returns - El producto actualizado.
     */
    const updateProducto = async (producto: Producto, token: string): Promise<Producto> => {
        const { data } = await $axiosService.put<Producto>(`/api/productos/${producto.id_producto}`, producto, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return data;
    };
    /**
     * Elimina un producto por su ID.
     * @param id - ID del producto a eliminar.
     * @param token - Token de autenticación.
     */
    const deleteProductoById = async (id: number, token: string): Promise<void> => {
        try {
            await $axiosService.delete(`/productos/delete-producto/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        } catch (error) {
            console.error('Error eliminando el producto:', error);
            throw error;
        }
    };
    /**
     * Desactiva los productos sin stock.
     * @param token - Token de autenticación.
     * @returns - Mensaje de éxito.
     */
    const desactivarProductosSinStock = async (token: string): Promise<string> => {
        try {
            const { data } = await $axiosService.post<string>('/productos/desactivarProductos', {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return data;
        } catch (error) {
            console.error('Error desactivando productos sin stock:', error);
            throw error;
        }
    };

    return {
        createProducto,
        getAllProductos,
        getProductoById,
        updateProducto,
        deleteProductoById,
        desactivarProductosSinStock,
    };
};

