<template>
  <v-card>
    <v-card-title>{{ producto.nombre }}</v-card-title>
    <v-card-subtitle> Categoría: {{ producto.categoria ? producto.categoria.nombre : 'Sin categoría' }} </v-card-subtitle>
    <v-card-text>
      Descripción: {{ producto.descripcion }}<br />
      Precio: {{ producto.precio }}<br />
      Stock: {{ producto.stock }}<br />
      Estado: {{ producto.estado }}
    </v-card-text>
    <v-card-actions>
      <v-btn text>Actualizar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    producto: {
      type: Object,
      required: true,
    },
  },
};
</script>
