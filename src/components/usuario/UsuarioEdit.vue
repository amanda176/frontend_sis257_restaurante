<script setup lang="ts">
import { onMounted, ref } from 'vue'
import http from '@/plugins/axios'
import router from '@/router'

const id = router.currentRoute.value.params['id']

const usuario = ref('')
const clave = ref('')
const email = ref('')
const rol = ref('')
const empleado_id = ref<number | null>(null)

const roles = ['administrador', 'cajero', 'repartidor']
const empleados = ref<{ id: number; nombres: string; primer_apellido: string }[]>([])

async function cargarUsuario() {
  const res = await http.get(`usuarios/${id}`)
  const data = res.data
  usuario.value = data.usuario
  clave.value = data.clave
  email.value = data.email
  rol.value = data.rol
  empleado_id.value = data.empleado?.id
}

async function cargarEmpleados() {
  empleados.value = await http.get('empleados').then(res => res.data)
}

async function editarUsuario() {
  await http.put(`usuarios/${id}`, {
    usuario: usuario.value,
    clave: clave.value,
    email: email.value,
    rol: rol.value,
    empleado: { id: empleado_id.value }
  }).then(() => router.push('/usuarios'))
}

onMounted(() => {
  cargarUsuario()
  cargarEmpleados()
})
</script>

<template>
  <div class="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><RouterLink to="/">Inicio</RouterLink></li>
        <li class="breadcrumb-item"><RouterLink to="/usuarios">Usuarios</RouterLink></li>
        <li class="breadcrumb-item active" aria-current="page">Editar Usuario</li>
      </ol>
    </nav>

    <h2>Editar Usuario</h2>

    <form @submit.prevent="editarUsuario">
      <div class="form-floating mb-3">
        <input type="text" class="form-control" v-model="usuario" placeholder="Usuario" required />
        <label>Usuario</label>
      </div>

      <div class="form-floating mb-3">
        <input type="password" class="form-control" v-model="clave" placeholder="Contraseña" required />
        <label>Contraseña</label>
      </div>

      <div class="form-floating mb-3">
        <input type="text" class="form-control" v-model="email" placeholder="Email" required />
        <label>Email</label>
      </div>

      <div class="form-floating mb-3">
        <select class="form-select" v-model="rol" required>
          <option disabled value="">Seleccione un rol</option>
          <option v-for="r in roles" :key="r" :value="r">{{ r }}</option>
        </select>
        <label>Rol</label>
      </div>

      <div class="form-floating mb-3">
        <select class="form-select" v-model="empleado_id" required>
          <option disabled value="">Seleccione un empleado</option>
          <option v-for="e in empleados" :key="e.id" :value="e.id">
            {{ e.nombres }} {{ e.primer_apellido }}
          </option>
        </select>
        <label>Empleado</label>
      </div>

      <div class="text-center mt-3">
        <button type="submit" class="btn btn-primary btn-lg">Guardar Cambios</button>
      </div>
    </form>

    <div class="text-left mt-2">
      <button class="btn btn-link" @click="router.go(-1)">Volver</button>
    </div>
  </div>
</template>


<style></style>
