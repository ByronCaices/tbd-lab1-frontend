<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <v-app-bar app color="primary">
    <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    <v-toolbar-title>Navbar</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn text to="/">Home</v-btn>
    <v-btn text to="/productos">Productos</v-btn>
    <v-btn text to="/clientes">Clientes</v-btn>
    <v-btn text to="/categorias">Categorias</v-btn>
    <v-btn text to="/ordenes">Ordenes</v-btn>
    <v-btn text to="/detalleordenes">About</v-btn>
  </v-app-bar>
</template>