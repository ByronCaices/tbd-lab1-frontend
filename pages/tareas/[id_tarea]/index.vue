<template>
    <Header/>
    <div class="agregar-tarea">
        <h1>Editar Tarea</h1>
        <form @submit.prevent="handleSubmit">
            <div>
                <label for="nombre">Nombre:</label>
                <input type="text" id="nombre" v-model="nombre_nota" required>
            </div>
            <div>
                <label for="descripcion">Descripción:</label>
                <textarea id="descripcion" v-model="contenido_nota" required></textarea>
            </div>
            <div>
                <label for="fecha">Fecha de Termino:</label>
                <input type="date" id="fecha" v-model="fecha_nota" required>
            </div>
            <button type="submit">Guardar Cambios</button>
        </form>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useNotaService } from '~/services/notaService';
import Header from "@/components/Header.vue"; // Ajusta la ruta según tu estructura de archivos


export default{
    components: {
        Header,
    },
    data() {
        return {
            nombre_nota: '',
            contenido_nota: '',
            fecha_nota: '',
            completa_check_nota: false,
            id_nota: null,
        };
    },  
    async created() {
        const route = useRoute();
        
        const { getNotaById } = useNotaService();
        
        try {
            const token = localStorage.getItem("refresh_token");
            const nota = await getNotaById(Number(route.params.id_tarea), token);
            this.nombre_nota = nota.nombre_nota;
            this.contenido_nota = nota.contenido_nota;
            this.fecha_nota = nota.fecha_nota;
            this.completa_check_nota = nota.completa_check_nota;
            this.id_nota = nota.id_nota;
        } catch (error) {
            console.error('Error al cargar la nota:', error);
        }
    },
    methods: {
        async handleSubmit() {
            console.log('Nombre:', this.nombre_nota);
            console.log('Descripción:', this.contenido_nota);
            console.log('Fecha de Termino:', this.fecha_nota);
            console.log('Completada:', this.completa_check_nota);
            console.log('ID:', this.id_nota);
            const token = localStorage.getItem("refresh_token");
            console.log('Token:', token);
            const { updateNota } = useNotaService();
            const notaActualizada = {
                id_nota: this.id_nota,
                nombre_nota: this.nombre_nota,
                contenido_nota: this.contenido_nota,
                fecha_nota: this.fecha_nota,
                completa_check_nota: this.completa_check_nota,
                id_usuario: localStorage.getItem("id_usuario"),
            };

            try{
                await updateNota(notaActualizada, token);
                console.log('Nota actualizada:', notaActualizada);
                this.$router.push('/tareas');
            } catch (error) {
                console.error('Error al actualizar la nota:', error);
            }
        },
    }
}
</script>

<style scoped>
.agregar-tarea {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
}

.agregar-tarea h1 {
    text-align: center;
}

.agregar-tarea form div {
    margin-bottom: 15px;
}

.agregar-tarea form label {
    display: block;
    margin-bottom: 5px;
}

.agregar-tarea form input,
.agregar-tarea form textarea {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
}

.agregar-tarea form button {
    display: block;
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.agregar-tarea form button:hover {
    background-color: #0056b3;
}
</style>