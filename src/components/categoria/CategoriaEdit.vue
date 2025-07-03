<script setup lang="ts">
import { onMounted, ref } from 'vue'
import http from '@/plugins/axios'
import router from '@/router'

const props = defineProps<{
  ENDPOINT_API: string
}>()

const ENDPOINT = props.ENDPOINT_API ?? ''
const nombre = ref('')
const descripcion = ref('')
const id = router.currentRoute.value.params['id']

async function editarCategoria() {
  await http
    .patch(`${ENDPOINT}/${id}`, {
      nombre: nombre.value,
      descripcion: descripcion.value,
    })
    .then(() => router.push('/categoriaPlatillos'))
}

async function getCategoria() {
  await http.get(`${ENDPOINT}/${id}`).then((response) => {
    ;(nombre.value = response.data.nombre),
      (descripcion.value = response.data.descripcion)
  })
}

function goBack() {
  router.go(-1)
}

onMounted(() => {
  getCategoria()
})
</script>

<template>
  <br /><br /><br />
  <div class="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><RouterLink to="/">Inicio</RouterLink></li>
        <li class="breadcrumb-item">
          <RouterLink to="/categoriaPlatillos">Categoria</RouterLink>
        </li>
        <li class="breadcrumb-item active" aria-current="page" style="color: black">
          Editar Categoria
        </li>
      </ol>
    </nav>
    <div class="find-us">
      <div class="row">
        <div class="col-md-12">
          <div class="section-heading">
            <h2>EDITAR DATOS DE LA CATEGORIA</h2>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <form @submit.prevent="editarCategoria">
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            v-model="nombre"
            placeholder="nombre"
            required
          />
          <label for="nombre">Nombre Completo</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            v-model="descripcion"
            placeholder="descripcion"
            required
          />
          <label for="descripcion">Descripción</label>
        </div>

        <div class="text-center mt-3">
          <button type="submit" class="btn btn-primary btn-lg">
            <font-awesome-icon icon="fa-solid fa-floppy-disk" /> Guardar Categoria
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
