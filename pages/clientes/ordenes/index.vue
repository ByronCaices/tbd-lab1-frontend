<template>
    <Header />
    <div class="background">
        <div class="titulo-boton">
            <div class="lexend-deca-title" style="font-size: 50px; color: var(--mixed-a100)">Lista de ordenes</div>
            <div class="boton-orden">
                <v-btn color="var(--primary-a0)" size="small" variant="tonal" class="boton-chico">
                    Añadir orden
                </v-btn>
            </div>
        </div>
        <div class="ordenes">
            <v-list>
                <v-list-item v-for="orden in ordenes" :key="orden.id" cols="12" sm="6" md="4" lg="3">
                    <v-card class="ma-3" outlined>
                        <div class="d-flex justify-between align-center py-3 pl-3">
                            <div class="d-flex flex-column">
                                <div class="font-weight-bold mb-1">{{ orden.fecha }}</div>
                                <div>{{ orden.estado }}</div>
                                <div>{{ orden.nombre_cliente }}</div>
                                <div>{{ orden.precio }}</div>
                            </div>
                            <v-spacer></v-spacer>
                        </div>
                        <v-divider></v-divider>
                        <div class="boton-editar-eliminar d-flex justify-between mt-4 py-3">
                            <v-btn class="mx-2 px-4" color="var(--surface-a100)" size="small" outlined @click="completarTarea(index)">
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
import Header from "@/components/Header.vue";

export default {
  components: {
    Header,
  },
  data() {
    return {
      ordenes: [
        { id: 1, fecha: "13-11-2024", estado: "Entregado", nombre_cliente:"AAAA", precio: "100.00"},
        { id: 1, fecha: "13-11-2024", estado: "Entregado", nombre_cliente:"BBBB", precio: "100.00"}
      ],
    };
  },
  async mounted() {
    try {
      const response = await fetch("http://localhost:3000/productos");
      const data = await response.json();
      if (data && Array.isArray(data)) {
        this.ordenes = data;
      }
    } catch (error) {
      console.error("Error al cargar los productos:", error);
    }
  },
};
</script>


<style scoped>
.background {
  padding: 2rem;
}

.ordenes {
  background-color: var(--surface-a40); /* Un tono más claro que #282828 */
  padding: 1rem;
  border-radius: 8px;
}

.v-card {
  background-color: var( --surface-a60);
  color: white; 
  box-shadow: 1px 1px 5px 0px rgba(0,0,0,0.75);
  border: 1px solid #444444; 
}

.boton-chico {
  font-size: 14px;
  padding: 6px 12px;
  min-width: 100px;
  text-transform: uppercase;
}
.titulo-boton {
  text-align: center; 
  padding: 2rem 0;
}
</style>