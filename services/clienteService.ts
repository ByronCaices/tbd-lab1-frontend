import { useNuxtApp } from "#app";
import type { Cliente } from "@/models/cliente";

export const useClienteService = () => {
    const { $axiosService } = useNuxtApp();

    const createCliente = async (cliente: Cliente): Promise<Cliente> => {
        const { data } = await $axiosService.post<Cliente>("/clientes/", cliente);
        return data;
    };

    const getClienteById = async (id : number, token: string): Promise<Cliente> => {
        try {
            const { data } = await $axiosService.get<Cliente>(`/clientes/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const getAllClientes = async (token: string): Promise<Cliente[]> => {
        const { data } = await $axiosService.get<Cliente[]>("/clientes/", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return data;
    };

    const updateCliente = async (cliente: Cliente, token: string): Promise<Cliente> => {
        const { data } = await $axiosService.put<Cliente>("/clientes/", cliente, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return data;
    };

    const deleteCliente = async (id: number, token: string): Promise<void> => {
        await $axiosService.delete(`/clientes/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    };

    return {
        createCliente,
        getClienteById,
        getAllClientes,
        updateCliente,
        deleteCliente
    };
}
