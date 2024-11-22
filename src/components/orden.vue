<template>
  <v-card>
    <v-card-title>{{ orden.idOrden }}</v-card-title>
    <v-card-subtitle> Cliente: {{ orden.cliente ? orden.cliente.nombre : 'Sin cliente' }} </v-card-subtitle>
    <v-card-text>
      Fecha: {{ orden.fechaOrden }}<br />
      Estado: {{ orden.estado }}<br />
      Total: {{ orden.total }}
    </v-card-text>
    <v-card-actions>
      <v-btn text>Actualizar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    orden: {
      type: Object,
      required: true,
    },
  },
};
</script>
