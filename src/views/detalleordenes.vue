<script setup>
import DetalleOrden from '@/components/detalleorden.vue';
import { ref, onMounted } from 'vue';
import axios from 'axios';

const detalleOrdenes = ref([]);
const ordenes = ref([]);
const productos = ref([]);

const newDetalleOrden = ref({
  orden: null,
  producto: null,
  cantidad: 1,
  precioUnitario: 0,
});

// Fetch existing DetalleOrden entries
const fetchDetalleOrdenes = async () => {
  try {
    const response = await axios.get('http://localhost:8090/detalleordenes/');
    detalleOrdenes.value = response.data;
    console.log('Fetched detalleOrdenes:', JSON.stringify(detalleOrdenes.value, null, 2));
  } catch (error) {
    console.error('Error fetching detalleOrdenes:', error);
  }
};

// Fetch Orden options
const fetchOrdenes = async () => {
  try {
    const response = await axios.get('http://localhost:8090/ordenes/');
    ordenes.value = response.data;
    console.log('Fetched ordenes:', JSON.stringify(ordenes.value, null, 2));
  } catch (error) {
    console.error('Error fetching ordenes:', error);
  }
};

// Fetch Producto options
const fetchProductos = async () => {
  try {
    const response = await axios.get('http://localhost:8090/productos/');
    productos.value = response.data;
    console.log('Fetched productos:', JSON.stringify(productos.value, null, 2));
  } catch (error) {
    console.error('Error fetching productos:', error);
  }
};

// Create new DetalleOrden
const createDetalleOrden = async () => {
  const payload = {
    ...newDetalleOrden.value,
    orden: { idOrden: newDetalleOrden.value.orden.idOrden },
    producto: { idProducto: newDetalleOrden.value.producto.idProducto },
  };

  console.log('Preparing to create new detalleOrden:', JSON.stringify(payload, null, 2));

  try {
    const response = await axios.post('http://localhost:8090/detalleordenes/', payload);
    console.log('DetalleOrden created successfully:', response.data);

    detalleOrdenes.value.push(response.data);
    newDetalleOrden.value = { orden: null, producto: null, cantidad: 1, precioUnitario: 0 };
  } catch (error) {
    console.error('Error creating detalleOrden:', error);
  }
};

onMounted(() => {
  fetchDetalleOrdenes();
  fetchOrdenes();
  fetchProductos();
});
</script>

<template>
  <v-container class="detalle-ordenes-page" fluid>
    <!-- Header Section -->
    <v-row class="header" justify="center" align="center">
      <v-col cols="12" class="text-center">
        <h2 class="title">Detalle Ordenes</h2>
      </v-col>
    </v-row>

    <!-- DetalleOrdenes Section -->
    <v-row class="detalle-ordenes-section" justify="center">
      <v-col cols="12">
        <v-row class="container" dense>
          <v-col v-for="detalle in detalleOrdenes" :key="detalle.idDetalle" cols="12" sm="6" md="4" lg="3">
            <DetalleOrden :detalle="detalle" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!-- Form to Create DetalleOrden -->
    <v-row class="form-section" justify="center">
      <v-col cols="12" md="6">
        <v-form @submit.prevent="createDetalleOrden" class="detalle-orden-form">
          <label for="orden-select" class="styled-select-label">Orden</label>
          <div class="styled-select">
            <select v-model="newDetalleOrden.orden" id="orden-select">
              <option value="" disabled selected>Seleccione una orden</option>
              <option v-for="orden in ordenes" :key="orden.idOrden" :value="orden">
                Orden ID: {{ orden.idOrden }}
              </option>
            </select>
          </div>

          <label for="producto-select" class="styled-select-label">Producto</label>
          <div class="styled-select">
            <select v-model="newDetalleOrden.producto" id="producto-select">
              <option value="" disabled selected>Seleccione un producto</option>
              <option v-for="producto in productos" :key="producto.idProducto" :value="producto">
                {{ producto.nombre }}
              </option>
            </select>
          </div>

          <v-text-field v-model="newDetalleOrden.cantidad" label="Cantidad" outlined clearable type="number" />
          <v-text-field v-model="newDetalleOrden.precioUnitario" label="Precio Unitario" outlined clearable type="number" />

          <v-btn color="primary" @click="createDetalleOrden">Crear Detalle Orden</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
/* Add consistent styles */
.detalle-ordenes-page {
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

/* Container for DetalleOrdenes */
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
.detalle-orden-form {
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

/* Styled select dropdown to match Vuetify style */
.styled-select-label {
  font-size: 16px;
  color: #ffffff;
  margin-bottom: 8px;
  display: block;
}

.styled-select {
  position: relative;
  display: inline-block;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 4px;
  overflow: hidden;
}

.styled-select select {
  width: 100%;
  padding: 10px;
  background: transparent;
  color: #000000;
  border: none;
  appearance: none;
  font-size: 16px;
  font-family: 'Poppins', sans-serif;
}

.styled-select select:focus {
  outline: none;
}

.styled-select::after {
  content: '▼';
  font-size: 12px;
  color: #ffffff;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}

/* Button Styles */
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
