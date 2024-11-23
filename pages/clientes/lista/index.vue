<template>
    <Header />
    <div class="background">
      <div class="titulo-boton">
        <div class="lexend-deca-title" style="font-size: 50px; color: var(--mixed-a100)">
          Lista de Clientes
        </div>
        <div class="boton-clientes">
          <v-btn color="var(--primary-a0)" size="small" variant="tonal" class="boton-chico">
            Añadir Cliente
          </v-btn>
        </div>
      </div>
  
      <div v-if="clientes && clientes.length > 0" class="lista-clientes">
        <v-row>
          <v-col v-for="cliente in clientes" :key="cliente.id" cols="12" sm="6" md="4" lg="3">
            <v-card class="info-cliente">
              <v-card-title class="text-h6" style="color: var(--mixed-a0)">
                {{ cliente.nombre }}
              </v-card-title>
              <v-card-subtitle class="text-body-1" style="color: var(--mixed-a20)">
                {{ cliente.email }}
              </v-card-subtitle>
              <v-card-text style="color: var(--surface-a0)">
                <div>Dirección: {{ cliente.direccion }}</div>
                <div>Teléfono: {{ cliente.telefono }}</div>
              </v-card-text>
              <v-card-actions>
                <v-btn class="mx-2 px-4" color="var(--primary-a0)" size="small" outlined>
                  Editar
                </v-btn>
                <v-btn class="mx-2 px-4" color="error" size="small" outlined @click="eliminarCliente(cliente.id)">
                  Eliminar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </div>
  
      <div v-else class="no-clientes">
        No hay clientes disponibles.
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
        clientes: [
          { id: 1, nombre: "Alma Marcela", email: "alma@gmail.com", direccion: "Calle Falsa 123", telefono: "912345678" },
        ],
      };
    },
    methods: {
      eliminarCliente(id) {
        this.clientes = this.clientes.filter((cliente) => cliente.id !== id);
        console.log(`Cliente con ID ${id} eliminado.`);
      },
    },
    async mounted() {
      try {
        const response = await fetch("http://localhost:3000/clientes");
        const data = await response.json();
        if (data && Array.isArray(data)) {
          this.clientes = data;
        }
      } catch (error) {
        console.error("Error al cargar los clientes:", error);
      }
    },
  };
  </script>
  
  <style scoped>
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
  
  .boton-clientes {
    padding: 1rem 0;
  }
  
  .lista-clientes {
    padding: 2rem;
  }
  
  .no-clientes {
    font-size: 1.5rem;
    color: var(--primary-a100);
    text-align: center;
    padding: 2rem;
  }
  
  .info-cliente {
    background-color: var(--surface-a100);
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .v-btn {
    border-radius: 4px;
  }
  
  .v-btn:disabled {
    background-color: #d3d3d3;
    color: #a0a0a0;
  }
  </style>
  