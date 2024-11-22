<script setup>
import Producto from '@/components/producto.vue';
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';

const productos = ref([]);
const categorias = ref([]);
const newProducto = ref({
  nombre: '',
  descripcion: '',
  precio: 0,
  stock: 0,
  estado: '',
  categoria: null,
});

// Fetch products
const fetchProductos = async () => {
  try {
    const response = await axios.get("http://localhost:8090/productos/");
    productos.value = response.data;
    console.log('Fetched productos:', JSON.stringify(productos.value, null, 2));
  } catch (error) {
    console.error("Error fetching productos:", error);
  }
};

// Fetch categories
const fetchCategorias = async () => {
  try {
    const response = await axios.get("http://localhost:8090/categorias/");
    categorias.value = response.data;
    console.log('Fetched categorias:', JSON.stringify(categorias.value, null, 2));
  } catch (error) {
    console.error("Error fetching categorias:", error);
  }
};
const createProducto = async () => {
  console.log('Preparing to create new product:', JSON.stringify(newProducto.value, null, 2));

  // Ensure categoria is an object with both idCategoria and nombre
  const payload = {
    ...newProducto.value,
    categoria: {
      idCategoria: newProducto.value.categoria.idCategoria,
      nombre: newProducto.value.categoria.nombre
    }
  };

  try {
    const response = await axios.post("http://localhost:8090/productos/", payload);
    console.log('Product created successfully:', response.data);

    productos.value.push(response.data);
    newProducto.value = {
      nombre: '',
      descripcion: '',
      precio: 0,
      stock: 0,
      estado: '',
      categoria: null,
    };
  } catch (error) {
    console.error("Error creating producto:", error);
  }
};



// Watch changes on categoria selection
watch(newProducto.categoria, (newVal) => {
  console.log('Selected categoria ID:', newVal);
});

onMounted(() => {
  fetchProductos();
  fetchCategorias();
});
</script>

<template>
  <v-container class="productos-page" fluid>
    <!-- Header Section -->
    <v-row class="header" justify="center" align="center">
      <v-col cols="12" class="text-center">
        <h2 class="title">Productos</h2>
      </v-col>
    </v-row>

    <!-- Products Section -->
    <v-row class="productos-section" justify="center">
      <v-col cols="12">
        <v-row class="container" dense>
          <v-col v-for="producto in productos" :key="producto.idProducto" cols="12" sm="6" md="4" lg="3">
            <Producto :producto="producto" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>

<!-- Form to Create Products -->
<v-row class="form-section" justify="center">
  <v-col cols="12" md="6">
    <v-form @submit.prevent="createProducto" class="producto-form">
      <v-text-field v-model="newProducto.nombre" label="Nombre" outlined clearable />
      <v-text-field v-model="newProducto.descripcion" label="Descripción" outlined clearable />
      <v-text-field v-model="newProducto.precio" label="Precio" outlined clearable type="number" />
      <v-text-field v-model="newProducto.stock" label="Stock" outlined clearable type="number" />
      <v-text-field v-model="newProducto.estado" label="Estado" outlined clearable />

      <!-- Styled simple dropdown -->
      <label for="categoria-select" class="styled-select-label">Categoría</label>
      <div class="styled-select">
        <select v-model="newProducto.categoria" id="categoria-select">
          <option value="" disabled selected>Seleccione una categoría</option>
          <option v-for="categoria in categorias" :key="categoria.idCategoria" :value="categoria">
            {{ categoria.nombre }}
          </option>
        </select>
      </div>

      <v-btn color="primary" @click="createProducto">Crear Producto</v-btn>
    </v-form>
  </v-col>
</v-row>

  </v-container>
</template>

<style scoped>
/* Add the styles as provided earlier */
</style>


<style scoped>
.productos-page {
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

/* Container for Products */
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
.producto-form {
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
