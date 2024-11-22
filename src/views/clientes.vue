<script setup>
import Cliente from '@/components/cliente.vue';
import { ref, onMounted } from 'vue';
import axios from 'axios';

const clientes = ref([]);
const newCliente = ref({ nombre: '', direccion: '', email: '', telefono: '' });

const fetchClientes = async () => {
  try {
    const response = await axios.get("http://localhost:8090/clientes/");
    clientes.value = response.data;
  } catch (error) {
    console.error("Error fetching clientes:", error);
  }
};

const createCliente = async () => {
  try {
    const response = await axios.post("http://localhost:8090/clientes/", newCliente.value);
    clientes.value.push(response.data);
    newCliente.value = { nombre: '', direccion: '', email: '', telefono: '' };
  } catch (error) {
    console.error("Error creating cliente:", error);
  }
};

onMounted(fetchClientes);
</script>

<template>
  <v-container class="clientes-page" fluid>
    <v-row class="header" justify="center" align="center">
      <v-col cols="12" class="text-center">
        <h2 class="title">Clientes</h2>
      </v-col>
    </v-row>

    <v-row class="clientes-section" justify="center">
      <v-col cols="12">
        <v-row class="container" dense>
          <v-col v-for="cliente in clientes" :key="cliente.idCliente" cols="12" sm="6" md="4" lg="3">
            <Cliente :cliente="cliente" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row class="form-section" justify="center">
      <v-col cols="12" md="6">
        <v-form @submit.prevent="createCliente" class="cliente-form">
          <v-text-field v-model="newCliente.nombre" label="Nombre" outlined clearable />
          <v-text-field v-model="newCliente.direccion" label="Dirección" outlined clearable />
          <v-text-field v-model="newCliente.email" label="Email" outlined clearable />
          <v-text-field v-model="newCliente.telefono" label="Teléfono" outlined clearable />
          <v-btn color="primary" @click="createCliente">Crear Cliente</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      clientes: [],
      newClienteName: "",
      newClienteDireccion: "",
      newClienteEmail: "",
      newClienteTelefono: "",
    };
  },
  mounted() {
    this.fetchClientes();
  },
  methods: {
    async fetchClientes() {
      try {
        const response = await axios.get("http://localhost:8090/api/v1/clientes/");
        this.clientes = response.data;
      } catch (error) {
        console.error("Error fetching clientes:", error);
      }
    },
    async createCliente() {
      try {
        const response = await axios.post("http://localhost:8090/api/v1/clientes/", {
          nombre: this.newClienteName,
          direccion: this.newClienteDireccion,
          email: this.newClienteEmail,
          telefono: this.newClienteTelefono,
        });
        this.clientes.push(response.data);
        this.newClienteName = "";
        this.newClienteDireccion = "";
        this.newClienteEmail = "";
        this.newClienteTelefono = "";
      } catch (error) {
        console.error("Error creating cliente:", error);
      }
    },
  },
};
</script>
<style scoped>
.categorias-page {
  background: linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d);
  color: #ffffff;
  min-height: 100vh;
  padding-top: 20px;
  font-family: 'Poppins', sans-serif;
}

/* Header Styles */
.header .title {
  font-size: 2.5rem;
  color: #ff6ec7;
  text-shadow: 0px 0px 8px rgba(255, 110, 199, 0.8);
  font-weight: 700;
}

/* Container for Categories */
.container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
}

.container .v-col {
  display: flex;
  justify-content: center;
}

/* Form Styles */
.categoria-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
}

.v-text-field input {
  color: #ffffff;
}

.v-btn {
  background-color: #ff6ec7;
  color: #0e0732;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.v-btn:hover {
  background-color: #00d4ff;
  color: #ffffff;
}
</style>
