<script setup lang="ts">
import { ref, onMounted } from 'vue'
import http from '@/plugins/axios'
import router from '@/router'

const props = defineProps<{
  ENDPOINT_API: string
}>()

const ENDPOINT = props.ENDPOINT_API ?? ''
const cedula_identidad = ref('')
const celular = ref('')
const nombres = ref('')
const primer_apellido = ref('')
const segundo_apellido = ref('')
const direccion = ref('')
const id = router.currentRoute.value.params['id']


async function getEmpleado() {
  await http.get(`${ENDPOINT}/${id}`).then((response) => {
    ; (cedula_identidad.value = response.data.cedula_identidad),
      (nombres.value = response.data.nombres),
      (celular.value = response.data.celular),
      (primer_apellido.value = response.data.primer_apellido),
      (segundo_apellido.value = response.data.segundo_apellido),
      (direccion.value = response.data.direccion)
  })
}

async function actualizarEmpleado() {
  await http
    .patch(`${ENDPOINT}/${id}`, {
  cedula_identidad: cedula_identidad.value,
  celular: celular.value,
  nombres: nombres.value,
  primer_apellido: primer_apellido.value,
  segundo_apellido: segundo_apellido.value,
  direccion: direccion.value,
})
    .then(() => router.push('/empleados'))
}

function goBack() {
  router.go(-1)
}

onMounted(() => {
  getEmpleado()
})
</script>


<template>
  <br /><br /><br />
  <div class="container">
    <div class="find-us">
      <div class="row">
        <div class="col-md-12">
          <div class="section-heading">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <RouterLink to="/">Inicio</RouterLink>
                </li>
                <li class="breadcrumb-item">
                  <RouterLink to="/empleados">Empleados</RouterLink>
                </li>
                <li class="breadcrumb-item active" aria-current="page">Crear</li>
              </ol>
            </nav>
            <h2>ACTULIZAR EMPLEADO</h2>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <form @submit.prevent="actualizarEmpleado">
        <div class="form-floating mb-3">
          <input class="form-control" v-model="cedula_identidad" required />
          <label>Cédula de Identidad</label>
        </div>
        <div class="form-floating mb-3">
          <input type="number" class="form-control" v-model="celular" required />
          <label>Celular</label>
        </div>
        <div class="form-floating mb-3">
          <input class="form-control" v-model="nombres" required />
          <label>Nombres</label>
        </div>
        <div class="form-floating mb-3">
          <input class="form-control" v-model="primer_apellido" required />
          <label>Primer Apellido</label>
        </div>
        <div class="form-floating mb-3">
          <input class="form-control" v-model="segundo_apellido" />
          <label>Segundo Apellido</label>
        </div>
        <div class="form-floating mb-3">
          <input class="form-control" v-model="direccion" />
          <label>Dirección</label>
        </div>

        <div class="text-center mt-3">
          <button type="submit" class="btn btn-primary btn-lg">
            <font-awesome-icon icon="fa-solid fa-floppy-disk" /> Actulizar Empleado
          </button>
        </div>
      </form>
    </div>
    <div class="text-left">
      <button class="btn btn-success" @click="goBack">Volver</button>
    </div>
  </div>
</template>

<style></style>
