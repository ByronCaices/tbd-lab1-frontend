import { useNuxtApp } from "#app";
import type { Nota } from "@/models/nota";

export const useNotaService = () => {
  const { $axiosService } = useNuxtApp();

  /**
   * Crea una nueva nota.
   * @param nota - Objeto que representa la nota a crear.
   * @returns El objeto Nota creada.
   */
  const createNota = async (nota: Nota, token: String): Promise<Nota> => {
    const { data } = await $axiosService.post<Nota>("/api/nota/", nota, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  };

  /**
   * Crea una nueva nota.
   * @param id - Id del usuario al que pertenece la nota.
   * @returns El objeto Nota creada.
   */
  const getNotasByUserId = async (
    id: number,
    token: String
  ): Promise<Nota[]> => {
    const { data } = await $axiosService.get<Nota[]>(
      `/api/nota/notas-usuario/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  };

  /**
   * Obtiene una nota por su id.
   * @param id - Id de la nota a obtener.
   * @returns El objeto Nota correspondiente al id proporcionado.
   */
  const getNotaById = async (id: number, token: String): Promise<Nota> => {
    try {
      const { data } = await $axiosService.get<Nota>(
        `/api/nota/id-nota/${id}`, // Cambiado de /api/nota/id-usuario/${id}
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  /**
   * Obtiene todas las notas.
   * @returns Una lista de todas las notas
   * */
  const getAllNotas = async (token: String): Promise<Nota[]> => {
    const { data } = await $axiosService.get<Nota[]>("/api/nota/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  };

  /**
   * Actualiza una nota por su id.
   * @param id - Id de la nota a actualizar.
   * @param nota - Objeto que contiene los datos actualizados de la nota.
   * @returns El objeto Nota actualizado.
   */
  const updateNota = async (nota: Nota, token: String): Promise<Nota> => {
    const { data } = await $axiosService.put<Nota>(`/api/nota/`, nota, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  };

  /**
   * Elimina una nota por su id.
   * @param id - Id de la nota a eliminar.
   */
  const deleteNota = async (id: number, token: String): Promise<void> => {
    await $axiosService.delete(`/api/nota/delete-nota/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  interface BusquedaTareaParams {
    completa_check_nota?: boolean;
    nombre_nota?: string;
    contenido_nota?: string;
    id_usuario: number;
  }

  const buscarTareas = async (
    params: BusquedaTareaParams,
    token: String
  ): Promise<Nota[]> => {
    const { data } = await $axiosService.post<Nota[]>(
      `/api/nota/buscar-tareas`,
      params,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  };

  return {
    createNota,
    getNotaById,
    buscarTareas,
    getAllNotas,
    updateNota,
    getNotasByUserId,
    deleteNota,
  };
};
