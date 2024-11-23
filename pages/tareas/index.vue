<template>
  <!-- Encabezado con botones de notificaciones y cerrar sesión -->
  <Header />

  <div class="background">
    <h1 class="lexend-deca-title">My To Do List</h1>

    <!-- Botón para añadir tareas -->
    <div class="boton-tareas">
      <v-btn color="#e29818ff" size="small" variant="tonal" class="boton-chico" @click="irAAñadir">
        Añadir tareas
      </v-btn>
    </div>

    <!-- Lista de tareas -->
    <v-container>
      <!-- Control de filtro -->

      <v-select clearable chips v-model="filtro" :items="['todas', 'pendientes', 'completadas']" label="Mostrar tareas"
        variant="outlined" class="mb-4" />

      <v-row>
        <v-col v-for="tarea in tareasFiltradas" :key="tarea.id_nota" cols="12" sm="6" md="4">
          <v-card :title="tarea.nombre_nota" variant="tonal" :color="tarea.completa_check_nota ? 'green' : 'red'"
            :loading="isExpiringSoon(tarea)">
            <v-card-subtitle>Deadline: {{ tarea.fecha_nota }}</v-card-subtitle>
            <v-card-text>
              {{ tarea.contenido_nota }}
              <v-alert v-if="isExpiringSoon(tarea)" type="info" density="compact" variant="tonal"
                class="mt-2">
                ¡Esta tarea expira en menos de 24 hrs!
              </v-alert>
            </v-card-text>
            <v-card-actions>
              <!-- Botón para marcar como completada o pendiente -->
              <v-btn icon @click="toggleCompleta(tarea)">
                <v-icon>{{ tarea.completa_check_nota ? 'mdi-checkbox-marked' : 'mdi-checkbox-blank-outline' }}</v-icon>
              </v-btn>

              <!-- Botón para editar la tarea -->
              <v-btn icon @click="editarTarea(tarea)">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>

              <!-- Botón para eliminar la tarea -->
              <v-btn icon @click="deleteTarea(tarea.id_nota)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <v-dialog v-model="dialogEditar" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">Editar Tarea</span>
          </v-card-title>
          <v-card-text>
            <v-form ref="formEditar">
              <v-text-field label="Nombre" v-model="tareaAEditar.nombre_nota"></v-text-field>
              <v-textarea label="Contenido" v-model="tareaAEditar.contenido_nota"></v-textarea>
              <v-text-field v-model="tareaAEditar.fecha_nota" label="Fecha" type="date"></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" text @click="dialogEditar = false">Cancelar</v-btn>
            <v-btn color="green darken-1" text @click="guardarEdicion">Guardar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

    </v-container>



    <div class="tareas">
      <v-list>
        <v-list-item v-for="(nota, index) in notas" :key="index" class="d-flex align-center justify-space-between">
          <v-card class="mx-auto pa-4 mt-2 mb-3" elevation="8" rounded="lg"
            :color="nota.completa_check_nota ? '#e8f5e9' : '#ffebee'">
            <div class="d-flex justify-between">
              <div>
                <div class="font-weight-bold">{{ nota.nombre_notas }}</div>
                <div class="text-caption">Fecha: {{ nota.fecha_nota }}</div>
                <div class="text-body-1">{{ nota.contenido_nota }}</div>
              </div>
              <div class="d-flex align-center">
                <v-chip :color="nota.completa_check_nota ? 'green' : 'red'" class="ma-2" small>
                  {{ nota.completa_check_nota ? 'COMPLETADO' : 'PENDIENTE' }}
                </v-chip>
              </div>
            </div>
            <v-spacer></v-spacer>
            <div class="boton-editar-eliminar d-flex justify-between mt-4">
              <v-btn class="mx-2 px-4" color="#E29818FF" size="small" outlined @click="completarTarea(index)">
                Completar tarea
              </v-btn>
              <v-btn class="mx-2 px-4" color="#E29818FF" size="small" outlined @click="editarTarea(index)">
                Editar tarea
              </v-btn>
              <v-btn class="mx-2" color="red darken-1" size="small" outlined @click="eliminarTarea(index)">
                Eliminar tarea
              </v-btn>
            </div>
          </v-card>
        </v-list-item>
      </v-list>
    </div>
  </div>

</template>

<script>
import { useRouter } from "vue-router";
import { useNotaService } from "~/services/notaService";
import Header from "@/components/Header.vue"; // Ajusta la ruta según tu estructura de archivos

export default {
  name: "Tareas",
  components: {
    Header,
  },
  data() {
    return {

      notas: [],
      tareas: [],
      token: "your-token-here", // Puedes obtenerlo de localStorage si es necesario
      searchParams: {
        nombre_nota: "",
        contenido_nota: "",
        completa_check_nota: null,
        id_usuario: null, // Se asignará en mounted()
      },
      estadoOptions: [
        { text: "Todos", value: null },
        { text: "Completadas", value: true },
        { text: "Pendientes", value: false },
      ],
      refreshToken: null,
      id_usuario: null,
      filtro: "todas",
      dialogEditar: false,
      tareaAEditar: null,
      menuFecha: false, // Para el date picker

    };
  },
  computed: {
    tareasFiltradas() {
      if (this.filtro === 'todas') {
        return this.tareas;
      } else if (this.filtro === 'pendientes') {
        return this.tareas.filter(tarea => !tarea.completa_check_nota);
      } else if (this.filtro === 'completadas') {
        return this.tareas.filter(tarea => tarea.completa_check_nota);
      }
    },
  },
  mounted() {
    // Obtener valores del localStorage al montar el componente
    this.refreshToken = localStorage.getItem('refresh_token');
    this.userId = parseInt(localStorage.getItem('id_usuario'), 10);

    if (!this.refreshToken || !this.userId) {
      console.error("Token de refresco o ID de usuario no disponibles");
      // Maneja el error, por ejemplo, redirigiendo al login
      return;
    }
    this.fetchTareasByUser(); // Cargar tareas del usuario
  },
  methods: {
    async fetchTareasByUser() {
      try {
        const { getNotasByUserId } = useNotaService();
        console.log('fetchTareasByUser', this.userId, this.refreshToken);
        const response = await getNotasByUserId(this.userId, this.refreshToken);

        console.log('Response from API:', response);

        this.tareas = response;
      } catch (error) {
        console.error('Error al obtener las notas:', error);
      }
      console.log('Tareas:', this.tareas);
    },
    async deleteTarea(id_nota) {
      // Pregunta mediante notificacion de navegador, está seguro de eliminar la tarea
      const isConfirmed = window.confirm("¿Estás seguro de eliminar la tarea?");
      if (!isConfirmed) {
        return;
      }

      try {
        const notaService = useNotaService();
        console.log('Eliminando tarea con ID:', id_nota);
        await notaService.deleteNota(id_nota, this.refreshToken);
        console.log('Tarea eliminada en el backend.');

        // Elimina la tarea de la lista
        const index = this.tareas.findIndex(t => t.id_nota === id_nota);
        if (index !== -1) {
          console.log('Eliminando tarea del frontend en el índice:', index);
          this.tareas.splice(index, 1);
          console.log('Tareas actuales:', this.tareas);
        }
      } catch (error) {
        console.error('Error al eliminar la tarea:', error);
      }
      //window.location.reload();
    },
    isExpiringSoon(tarea) {
      if (tarea.completa_check_nota) {
        return false; // Si la tarea está completada, no está por expirar
      }
      const now = new Date();
      const dueDate = new Date(tarea.fecha_nota);
      const timeDiff = dueDate - now;
      return timeDiff > 0 && timeDiff <= 24 * 60 * 60 * 1000; // 24 horas en milisegundos
    },
    irAAñadir() {
      this.$router.push("/tareas/nueva");
    },
    completarTarea(index) {
      this.notas[index].completa_check_nota = true;
      const { updateNota } = useNotaService();
      updateNota(this.notas[index], this.refreshToken)
        .then(() => {
          // Opcional: actualizar la lista o mostrar una notificación
        })
        .catch((error) => {
          console.error("Error al completar la tarea:", error);
        });
    },
    editarTarea(index) {
      // Implementa la lógica para editar la tarea, por ejemplo, navegando a una ruta de edición
      const notaId = this.notas[index].id;
      this.$router.push(`/tareas/editar/${notaId}`);
    },
    async toggleCompleta(tarea) {
      try {
        const notaService = useNotaService();
        // Invertir el estado de 'completa_check_nota'
        tarea.completa_check_nota = !tarea.completa_check_nota;
        // Actualizar la tarea en el backend
        await notaService.updateNota(tarea, this.refreshToken);
      } catch (error) {
        console.error('Error al actualizar el estado de la tarea:', error);
      }
      //window.location.reload();
    },

    editarTarea(tarea) {
      // Crear una copia de la tarea para evitar modificarla directamente
      this.tareaAEditar = { ...tarea };
      this.dialogEditar = true;
    },

    async guardarEdicion() {
      try {
        const notaService = useNotaService();
        // Actualizar la tarea en el backend
        await notaService.updateNota(this.tareaAEditar, this.refreshToken);
        // Actualizar la tarea en la lista local
        const index = this.tareas.findIndex(t => t.id_nota === this.tareaAEditar.id_nota);
        if (index !== -1) {
          this.tareas.splice(index, 1, this.tareaAEditar);
        }
        this.dialogEditar = false;
      } catch (error) {
        console.error('Error al guardar la edición:', error);
      }
      //  window.location.reload();
    },
  },
};
</script>



<style scoped>
.background {
  background-color: #ffffff;
  min-height: 100vh;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* Centra horizontalmente */
  justify-content: flex-start;
  /* No centra verticalmente, coloca los elementos al inicio */
}


header h1 {
  margin-left: 20px;
  margin-top: 20px;
  font-size: 2.25rem;
  font-weight: bold;
  text-transform: uppercase;
}

nav {
  display: flex;
  height: 50px;
  gap: 10px;
  margin-top: 15px;
  margin-right: 20px;
}

.img-notif {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}

.boton-tareas {
  display: flex;
  justify-content: center;
  margin-right: 20px;
  margin-top: 20px;
}

.boton-chico {
  font-size: 14px;
  padding: 6px 12px;
  min-width: 100px;
  text-transform: uppercase;
}

.tareas {
  padding: 20px;
}

.tareas h1 {
  font-size: 24px;
  margin-bottom: 10px;
}

.COMPLETADO {
  background-color: #e8f5e9;
  border-left: 4px solid #4caf50;
}

.PENDIENTE {
  background-color: #ffebee;
  border-left: 4px solid #f44336;
}

.boton-editar-eliminar {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.search-section {
  width: 100%;
  max-width: 1200px;
  margin: 20px auto;
}

.lexend-deca-title {
  font-family: "Lexend Deca", sans-serif;
  font-optical-sizing: auto;
  color: #4CAF50;
  font-weight: 700;
  font-size: 4.25rem;
  font-style: normal;
}
</style>
