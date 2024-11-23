import { useNuxtApp } from "#app";

export const useAuthService = () => {
    const { $axiosService } = useNuxtApp();

    interface TokenResponse {
        accessToken: string;
        refreshToken: string;
        id_usuario: number;
    }

    /**
     * Autentiaca un usuario.
     * @param email - Correo del usuario.
     * @param password - Contraseña del usuario.
     * @returns El objeto con el token de autenticación y el refresh token.
     */
    const authenticate = async (username: string, password: string): Promise<TokenResponse> => {
        const { data } = await $axiosService.post<TokenResponse>("/api/auth/login", {
            username,
            password
        });
        return data;
    };

    return {
        authenticate
    };
}