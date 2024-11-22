<script setup>
import templatecard from '@/components/templatecard.vue';
</script>

<template>
  <v-container class="landing-page" fluid fill-height>
    <!-- Header Section -->
    <v-row class="header" justify="center" align="center">
      <v-col cols="12" class="text-center">
        <h1 class="title">Ecommerce</h1>
        <h2 class="subtitle">Your One-Stop Retro Shop</h2>
      </v-col>
    </v-row>

    <!-- Cards Section -->
    <v-row class="cards-section" justify="center" align="center" dense>
      <v-col cols="12" md="4">
        <templatecard :categoria="{ nombre: 'clientes' }" title="Clientes"></templatecard>
      </v-col>
      <v-col cols="12" md="4">
        <templatecard :categoria="{ nombre: 'categorias' }" title="Categorias"></templatecard>
      </v-col>
      <v-col cols="12" md="4">
        <templatecard :categoria="{ nombre: 'productos' }" title="Productos"></templatecard>
      </v-col>
      <v-col cols="12" md="4">
        <templatecard :categoria="{ nombre: 'ordenes' }" title="Ordenes"></templatecard>
      </v-col>
      <v-col cols="12" md="4">
        <templatecard :categoria="{ nombre: 'detalleordenes' }" title="Detalle de Orden"></templatecard>
      </v-col>
      <!-- Agrega más tarjetas aquí si es necesario -->
    </v-row>
  </v-container>
</template>

<style scoped>
.landing-page {
  background: linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d);
  color: #ffffff;
  min-height: 100vh;
  padding-top: 50px;
  font-family: 'Poppins', sans-serif;
}

/* Header Styles */
.header .title {
  font-size: 3rem;
  color: #ff6ec7; /* Neon pink */
  font-weight: 700;
  text-shadow: 0px 0px 8px rgba(255, 110, 199, 0.8);
}

.header .subtitle {
  font-size: 1.5rem;
  color: #fbd786; /* Soft yellow */
  font-weight: 300;
  margin-top: 0.5rem;
  text-shadow: 0px 0px 4px rgba(251, 215, 134, 0.7);
}

/* Cards Section */
.cards-section {
  padding-top: 30px;
}

.v-card {
  background: rgba(255, 255, 255, 0.1); /* Slightly transparent card */
  backdrop-filter: blur(10px); /* Blurry glass effect */
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  transition: transform 0.3s ease-in-out;
}

.v-card:hover {
  transform: scale(1.05);
}

/* Button Styles */
.v-btn {
  color: #00d4ff; /* Neon blue */
  border-color: #00d4ff;
}

.v-btn:hover {
  background-color: #00d4ff;
  color: #ffffff;
}
</style>
