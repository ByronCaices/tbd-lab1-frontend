<script setup>
import Orden from '@/components/orden.vue';
import { ref, onMounted } from 'vue';
import axios from 'axios';

const ordenes = ref([]);
const clientes = ref([]);
const newOrden = ref({
  fechaOrden: '',
  estado: '',
  cliente: null,
  total: 0,
});

// Fetch orders
const fetchOrdenes = async () => {
  try {
    const response = await axios.get("http://localhost:8090/ordenes/");
    ordenes.value = response.data;
    console.log('Fetched ordenes:', JSON.stringify(ordenes.value, null, 2));
  } catch (error) {
    console.error("Error fetching ordenes:", error);
  }
};

// Fetch clients
const fetchClientes = async () => {
  try {
    const response = await axios.get("http://localhost:8090/clientes/");
    clientes.value = response.data;
    console.log('Fetched clientes:', JSON.stringify(clientes.value, null, 2));
  } catch (error) {
    console.error("Error fetching clientes:", error);
  }
};
const createOrden = async () => {
  const formattedDate = new Date(newOrden.value.fechaOrden).toISOString(); // Converts to ISO 8601
  const payload = {
    ...newOrden.value,
    fechaOrden: formattedDate,
    total: parseFloat(newOrden.value.total),
    cliente: {
      idCliente: newOrden.value.cliente.idCliente,
      nombre: newOrden.value.cliente.nombre,
    },
  };

  try {
    const response = await axios.post("http://localhost:8090/ordenes/", payload);
    console.log('Order created successfully:', response.data);
    ordenes.value.push(response.data);
    newOrden.value = {
      fechaOrden: '',
      estado: '',
      cliente: null,
      total: 0,
    };
  } catch (error) {
    console.error("Error creating orden:", error);
  }
};


onMounted(() => {
  fetchOrdenes();
  fetchClientes();
});
</script>

<template>
  <v-container class="ordenes-page" fluid>
    <!-- Header Section -->
    <v-row class="header" justify="center" align="center">
      <v-col cols="12" class="text-center">
        <h2 class="title">Órdenes</h2>
      </v-col>
    </v-row>

    <!-- Orders Section -->
    <v-row class="ordenes-section" justify="center">
      <v-col cols="12">
        <v-row class="container" dense>
          <v-col v-for="orden in ordenes" :key="orden.idOrden" cols="12" sm="6" md="4" lg="3">
            <Orden :orden="orden" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!-- Form to Create Orders -->
    <v-row class="form-section" justify="center">
      <v-col cols="12" md="6">
        <v-form @submit.prevent="createOrden" class="orden-form">
          <v-text-field v-model="newOrden.fechaOrden" label="Fecha" outlined clearable />
          <v-text-field v-model="newOrden.estado" label="Estado" outlined clearable />
          <v-text-field v-model="newOrden.total" label="Total" outlined clearable type="number" />

          <!-- Styled client dropdown -->
          <label for="cliente-select" class="styled-select-label">Cliente</label>
          <div class="styled-select">
            <select v-model="newOrden.cliente" id="cliente-select">
              <option value="" disabled selected>Seleccione un cliente</option>
              <option v-for="cliente in clientes" :key="cliente.idCliente" :value="cliente">
                {{ cliente.nombre }}
              </option>
            </select>
          </div>

          <v-btn color="primary" @click="createOrden">Crear Orden</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
/* Add styles similar to productos.vue */
</style>
