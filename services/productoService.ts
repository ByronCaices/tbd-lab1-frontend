import { useNuxtApp } from '#app';
import type { Producto } from '@/models/producto';

export const useProductoService = () => {
    const { $axiosService } = useNuxtApp();
    /**
     * Crea un producto.
     * @param producto - Producto a crear.
     * @returns Producto creado.
     */
    const createProducto = async (producto: Producto): Promise<Producto>=> {
        const { data } = await $axiosService.post('/productos/', producto);
        return data;
    };
    /**
     * Entrega todos los productos que existen.
     * @param token - Token que se usa para la autenticación.
     * @returns - Todos los productos.
     */
    const getAllProductos = async (token: string): Promise<Producto[]> =>  {
        const { data } = await $axiosService.get<Producto[]>('/productos/', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return data;
    };
    /**
     * Obtiene un producto por su ID.
     * @param id - ID del producto a obtener.
     * @param token - Token que se usa para la autenticación.
     * @returns El producto con el ID especificado.
     */
    const getProductoById = async (id: number, token: string): Promise<Producto> => {
        try {
            const { data } = await $axiosService.get<Producto>(`/productos/id-producto/${id}`, {
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
     * Actualiza los datos de un producto.
     * @param producto - Producto a actualizar.
     * @param token - Token que se usa para la autenticación.
     * @returns El producto actualizado.
     */

    const updateProducto = async (producto: Producto, token: string): Promise<Producto> => {
        const { data } = await $axiosService.put<Producto>(`/productos/`, producto, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return data;
    };
    /**
     * Elimina un producto por su ID.
     * @param id - ID del producto a eliminar.
     * @param token - Token que se usa para la autenticación.
     * @returns
    */
    const deleteProductoById = async (id: number, token: string): Promise<void> => {
        try {
            await $axiosService.delete(`/productos/delete-producto/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        } catch (error) {
            console.error('Error eliminando el producto:', error);
            throw error;
        }
    };
    /**
     * Desactiva los productos que no tienen stock.
     * @param token - Token que se usa para la autenticación.
     * @returns .
     */
    const desactivarProductosSinStock = async (token: string): Promise<string> => {
        try {
            const { data } = await $axiosService.post<string>('/productos/desactivarProductos', {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
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
}


