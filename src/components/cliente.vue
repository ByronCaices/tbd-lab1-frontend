<template>
  <v-card
    :disabled="loading"
    :loading="loading"
    class="mx-auto my-12"
    :max-width="maxWidth"
  >
    <template v-slot:loader="{ isActive }">
      <v-progress-linear
        :active="isActive"
        color="deep-purple"
        height="4"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-card-item>
      <v-card-title>{{ cliente.nombre }}</v-card-title>
      <v-card-subtitle>{{ cliente.email }}</v-card-subtitle>
    </v-card-item>

    <v-card-text>
      <p><strong>Dirección:</strong> {{ cliente.direccion }}</p>
      <p><strong>Teléfono:</strong> {{ cliente.telefono }}</p>
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="deep-purple-lighten-2"
        text="Actualizar"
        block
        border
        @click="actualizar"
      >
        Actualizar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    cliente: {
      type: Object,
      required: true,
    },
    maxWidth: {
      type: [String, Number],
      default: 400,
    },
  },

  data() {
    return {
      loading: false,
    };
  },

  methods: {
    actualizar() {
      this.loading = true;
      setTimeout(() => (this.loading = false), 2000);
    },
  },
};
</script>

<style scoped>
p {
  margin: 0;
}
</style>
