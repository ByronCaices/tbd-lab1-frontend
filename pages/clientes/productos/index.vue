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
              <v-btn class="mx-2 px-4" color="var(--surface-a0)" size="small" outlined>Comprar</v-btn>
              <v-btn class="mx-2 px-4" color="var(--surface-a0)" size="small" outlined>Editar</v-btn>
              <v-btn class="mx-2 px-4" color="error" size="small" outlined @click="deleteProductoById(producto.id_producto)">Eliminar</v-btn>
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
import { useRouter } from "vue-router";
import { useProductoService } from "~/services/productoService";
import Header from "@/components/Header.vue"; // Ajusta la ruta según tu estructura de archivos

export default {
  name: "Productos",
  components: {
    Header,
  },
  data() {
    return {
      productos: [],
      loading: true,
      accesToken: null,
      id_usuario: null,
      dialogEditar: false,
      productoAEditar: null,
    };
  },
  mounted() {
    this.accesToken = localStorage.getItem("accessToken");
    this.userId = parseInt(localStorage.getItem("id_usuario"), 10);

    if (!this.accesToken || !this.userId) {
      console.error("--- Token de refresco o ID de usuario no disponibles");
      window.location.href = "/";
      return;
    }
    this.fetchProductos();
  },
  methods: {
    async fetchProductos() {
      this.loading = true;
      try {
        const { getAllProductos } = useProductoService();
        const response = await getAllProductos();
        this.productos = response;
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      } finally {
        this.loading = false;
      }
    },
    async deleteProductoById(id_producto) {
      const isConfirmed = window.confirm("¿Está seguro de eliminar el producto?");
      if (!isConfirmed) {
        return;
      }

      try {
        const productoService = useProductoService();
        await productoService.deleteProductoById(id_producto);
        console.log("Producto eliminado en el backend.");

        const index = this.productos.findIndex((t) => t.id_producto === id_producto);
        if (index !== -1) {
          this.productos.splice(index, 1);
        }
      } catch (error) {
        console.error("Error al eliminar el producto:", error);
      }
    },
    updateProducto(producto) {
      this.productoAEditar = { ...producto };
      this.dialogEditar = true;
    },
    async guardarEdicion() {
      try {
        const productoService = useProductoService();
        await productoService.updateProducto(this.productoAEditar);

        const index = this.productos.findIndex(
          (t) => t.id_producto === this.productoAEditar.id_producto
        );
        if (index !== -1) {
          this.productos.splice(index, 1, this.productoAEditar);
        }
        this.dialogEditar = false;
      } catch (error) {
        console.error("Error al guardar la edición:", error);
      }
    },
    irAAñadir() {
      this.$router.push("/clientes/nuevo");
    },
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
.boton-productos {
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
