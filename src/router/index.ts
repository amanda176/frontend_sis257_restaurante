import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import { useAuthStore } from '@/stores'
import { getTokenFromLocalStorage } from '@/helpers'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', name: 'login', component: LoginView },
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/pedido',
      name: 'pedido',
      component: () => import('../views/PedidoView.vue'),
      children: [
        { path: '', component: () => import('../components/pedido/PedidoList.vue') },
        { path: 'crear', component: () => import('../components/pedido/PedidoCreate.vue') },
        {
          path: 'editar/:id',
          component: () => import('../components/pedido/PedidoEdit.vue')
        }
      ]
    },
    {
      path: '/platillos', //direccion del swagger
      name: 'platillos',
      component: () => import('../views/PlatilloView.vue'),
      children: [
        { path: '', component: () => import('../components/platillo/PlatilloList.vue') },
        { path: 'crear', component: () => import('../components/platillo/PlatilloCreate.vue') },
        {
          path: 'editar/:id',
          component: () => import('../components/platillo/PlatilloEdit.vue')
        }
      ]
    },
    {
      path: '/pago', //direccion del swagger
      name: 'pago',
      component: () => import('../views/PagoView.vue'),
      children: [
        { path: '', component: () => import('../components/pago/PagoList.vue') },
        { path: 'crear', component: () => import('../components/pago/PagoCreate.vue') },
        {
          path: 'editar/:id',
          component: () => import('../components/pago/PagoEdit.vue')
        }
      ]
    },
    {
      path: '/detalles', //direccion del swagger
      name: 'detalles',
      component: () => import('../views/DetalleView.vue'),
      children: [
        { path: '', component: () => import('../components/detalle/DetalleList.vue') },
        { path: 'crear', component: () => import('../components/detalle/DetalleCreate.vue') },
        {
          path: 'editar/:id',
          component: () => import('../components/detalle/DetalleEdit.vue')
        }
      ]
    },
    {
      path: '/categoriaPlatillos', //direccion del swagger
      name: 'categoriaPlatillos',
      component: () => import('../views/CategoriaView.vue'),
      children: [
        { path: '', component: () => import('../components/categoria/CategoriaList.vue') },
        { path: 'crear', component: () => import('../components/categoria/CategoriaCreate.vue') },
        {
          path: 'editar/:id',
          component: () => import('../components/categoria/CategoriaEdit.vue')
        }
      ]
    },
    {
      path: '/direcciones', //direccion del swagger
      name: 'direcciones',
      component: () => import('../views/DireccionView.vue'),
      children: [
        { path: '', component: () => import('../components/direccion/DireccionList.vue') },
        { path: 'crear', component: () => import('../components/direccion/DireccionCreate.vue') },
        {
          path: 'editar/:id',
          component: () => import('../components/direccion/DireccionEdit.vue')
        }
      ]
    },
    {
      path: '/clientes', //direccion del swagger
      name: 'clientes',
      component: () => import('../views/ClienteView.vue'),
      children: [
        { path: '', component: () => import('../components/cliente/ClienteList.vue') },
        { path: 'crear', component: () => import('../components/cliente/ClienteCreate.vue') },
        {
          path: 'editar/:id',
          component: () => import('../components/cliente/ClienteEdit.vue')
        }
      ]
    },
    {
      path: '/usuarios', //direccion del swagger
      name: 'usuarios',
      component: () => import('../views/UsuarioView.vue'),
      children: [
        { path: '', component: () => import('../components/usuario/UsuarioList.vue') },
        { path: 'crear', component: () => import('../components/usuario/UsuarioCreate.vue') },
        {
          path: 'editar/:id',
          component: () => import('../components/usuario/UsuarioEdit.vue')
        }
      ]
    },

    {
      path: '/empleados',
      name: 'empleados',
      component: () => import('@/views/EmpleadoView.vue'),
      children: [
        { path: '', component: () => import('@/components/empleado/EmpleadoList.vue') },
        { path: 'crear', component: () => import('@/components/empleado/EmpleadoCreate.vue') },
        {
          path: 'editar/:id',
          component: () => import('@/components/empleado/EmpleadoEdit.vue')
        }
      ]
    }
  ]
})

router.beforeEach(async (to) => {
  const publicPages = ['/', '/login']
  const authRequired = !publicPages.includes(to.path)
  const authStore = useAuthStore()

  if (authRequired && !getTokenFromLocalStorage()) {
    if (authStore) authStore.logout()
    authStore.returnUrl = to.fullPath
    return '/login'
  }
})

export default router
