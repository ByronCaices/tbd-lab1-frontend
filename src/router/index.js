import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import categorias from '@/views/categorias.vue'
import clientes from '@/views/clientes.vue'
import productos from '@/views/productos.vue'
import ordenes from '@/views/ordenes.vue'
import detalleordenes from '@/views/detalleordenes.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/categorias',
      name: 'categorias',
      component: categorias
    },
    {
      path: '/clientes',
      name: 'clientes',
      component: clientes
    },

    {
      path: '/productos',
      name: 'productos',
      component: productos
    },
    {
      path: '/ordenes',
      name: 'ordenes',
      component: ordenes
    },
    {
      path: '/detalleordenes',
      name: 'detalleordenes',
      component: detalleordenes
    }
  ]
})

export default router
