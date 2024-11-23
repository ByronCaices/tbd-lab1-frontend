import axios from 'axios';

export default defineNuxtPlugin((nuxtApp) => {
  // Accede a las variables de entorno
  const config = useRuntimeConfig();

  // Crear la instancia de Axios
  const instance = axios.create({
    baseURL: config.public.backBaseUrl, // Usamos la URL del backend desde las variables de entorno
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Interceptor para incluir el token en las solicitudes
  /*
  instance.interceptors.request.use(
    (config) => {
      const token = 'test_token'; // Aquí podrías usar un token real de tu sistema de autenticación
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  */

  // Proveer la instancia de Axios a todo el app
  return {
    provide: {
      axiosService: instance,
    },
  };
});
