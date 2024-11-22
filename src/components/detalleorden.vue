<template>
  <v-card class="detalle-card">
    <v-card-title>Orden ID: {{ detalle.orden.idOrden }}</v-card-title>
    <v-card-subtitle>Producto: {{ detalle.producto.nombre }}</v-card-subtitle>
    <v-card-text>
      Cantidad: {{ detalle.cantidad }}<br />
      Precio Unitario: {{ detalle.precioUnitario }}
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    detalle: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.detalle-card {
  padding: 20px;
  margin-bottom: 20px;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.5);
  border-radius: 8px;
}
</style>
