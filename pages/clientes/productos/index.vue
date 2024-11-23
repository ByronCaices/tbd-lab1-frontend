<template>
  <Header />
  <div class="background">
    <div class="titulo-boton">
      <div class="lexend-deca-title" style="font-size: 50px; color: var(--mixed-a100)">Lista de productos</div>
      <div class="boton-productos">
        <v-btn color="var(--primary-a0)" size="small" variant="tonal" class="boton-chico">
          Añadir productos
        </v-btn>
      </div>
    </div>

    <div v-if="productos && productos.length > 0" class="lista-productos">
      <v-row>
        <v-col v-for="producto in productos" :key="producto.id" cols="12" sm="6" md="4" lg="3">
          <v-card class="info-producto">
            <v-card-title class="text-h6" style="color: var(--mixed-a0)">
              {{ producto.nombre }}
            </v-card-title>
            <v-card-subtitle class="text-body-1" style="color: var(--mixed-a20)">
              {{ producto.descripcion }}
            </v-card-subtitle>
            <v-card-text style="color: var(--surface-a0)">
              <div>Stock: {{ producto.stock }}</div>
              <div>Precio: {{ producto.precio }}</div>
            </v-card-text>
            <v-card-actions>
              <v-btn class="mx-2 px-4" color="var(--surface-a0)" size="small" outlined >Comprar</v-btn>
              <v-btn class="mx-2 px-4" color="--surface-a0" size="small" outlined >Editar</v-btn>
              <v-btn class="mx-2 px-4" color="error" size="small" outlined >Eliminar</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <div v-else class="no-productos">
      No hay productos disponibles.
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";

export default {
  components: {
    Header,
  },
  data() {
    return {
      productos: [
        { id: 1, nombre: "Producto 1", descripcion: "Descripción Producto 1", precio: "$100", stock: "1" },
        { id: 2, nombre: "Producto 2", descripcion: "Descripción Producto 2", precio: "$150", stock: "5" },
        { id: 3, nombre: "Producto 3", descripcion: "Descripción Producto 3", precio: "$200", stock: "22" },
        { id: 4, nombre: "Producto 4", descripcion: "Descripción Producto 4", precio: "$250", stock: "3" },
        { id: 5, nombre: "Producto 5", descripcion: "Descripción Producto 5", precio: "$300", stock: "10" },
        { id: 5, nombre: "Producto 5", descripcion: "Descripción Producto 5", precio: "$300", stock: "10" },
        { id: 5, nombre: "Producto 5", descripcion: "Descripción Producto 5", precio: "$300", stock: "10" },
        { id: 5, nombre: "Producto 5", descripcion: "Descripción Producto 5", precio: "$300", stock: "10" },
        { id: 5, nombre: "Producto 5", descripcion: "Descripción Producto 5", precio: "$300", stock: "10" },
        { id: 5, nombre: "Producto 5", descripcion: "Descripción Producto 5", precio: "$300", stock: "10" },
        { id: 5, nombre: "Producto 5", descripcion: "Descripción Producto 5", precio: "$300", stock: "10" },
        { id: 5, nombre: "Producto 5", descripcion: "Descripción Producto 5", precio: "$300", stock: "10" },
        { id: 5, nombre: "Producto 5", descripcion: "Descripción Producto 5", precio: "$300", stock: "10" },
        { id: 5, nombre: "Producto 5", descripcion: "Descripción Producto 5", precio: "$300", stock: "10" },
        { id: 5, nombre: "Producto 5", descripcion: "Descripción Producto 5", precio: "$300", stock: "10" },
        { id: 5, nombre: "Producto 5", descripcion: "Descripción Producto 5", precio: "$300", stock: "10" },
        { id: 5, nombre: "Producto 5", descripcion: "Descripción Producto 5", precio: "$300", stock: "10" },
        { id: 5, nombre: "Producto 5", descripcion: "Descripción Producto 5", precio: "$300", stock: "10" },
        { id: 5, nombre: "Producto 5", descripcion: "Descripción Producto 5", precio: "$300", stock: "10" },
        { id: 5, nombre: "Producto 5", descripcion: "Descripción Producto 5", precio: "$300", stock: "10" },
        { id: 5, nombre: "Producto 5", descripcion: "Descripción Producto 5", precio: "$300", stock: "10" },
        { id: 5, nombre: "Producto 5", descripcion: "Descripción Producto 5", precio: "$300", stock: "10" },
        { id: 5, nombre: "Producto 5", descripcion: "Descripción Producto 5", precio: "$300", stock: "10" },
        { id: 5, nombre: "Producto 5", descripcion: "Descripción Producto 5", precio: "$300", stock: "10" },
        { id: 5, nombre: "Producto 5", descripcion: "Descripción Producto 5", precio: "$300", stock: "10" },
      ],
    };
  },
  async mounted() {
    try {
      const response = await fetch("http://localhost:3000/productos");
      const data = await response.json();
      if (data && Array.isArray(data)) {
        this.productos = data;
      }
    } catch (error) {
      console.error("Error al cargar los productos:", error);
    }
  },
};
</script>

<style scoped>
.boton-chico {
  font-size: 14px;
  padding: 6px 12px;
  min-width: 100px;
  text-transform: uppercase;
}

.titulo-boton {
  text-align: center; 
  padding: 2rem 0;
}
.boton-productos{
    padding: 1rem 0;
}
.lista-productos {
  padding: 2rem;
}

.no-productos {
  font-size: 1.5rem;
  color: var(--primary-a100); 
  text-align: center;
  padding: 2rem;
}

.info-producto {
  background-color: var(--surface-a100); 
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.v-btn {
  border-radius: 4px;
}
</style>
