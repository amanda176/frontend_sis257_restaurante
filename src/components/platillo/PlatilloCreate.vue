<script setup lang="ts">
import { ref, onMounted } from 'vue'
import http from '@/plugins/axios'
import router from '@/router'
import type { Categoria } from '@/models/categoria'


var categoria = ref<Categoria[]>([])
async function getCategoria() {
  categoria.value = await http.get('categoriaPlatillos').then((response) => response.data)
}

onMounted(() => {
  getCategoria()
})

const props = defineProps<{
  ENDPOINT_API: string
}>()

const ENDPOINT = props.ENDPOINT_API ?? ''
const id = router.currentRoute.value.params['id']

const nombre = ref('')
const urlPlatillo = ref('')
const precio = ref(0)
const tiempoPreparacion = ref('')
const stock = ref(0)
const idCategoriaPlatillo = ref('')

async function crearPlatillo() {
  await http
    .post(ENDPOINT, {
      nombre: nombre.value,
      urlPlatillo: urlPlatillo.value,
      precio: precio.value,
      stock: stock.value,
      tiempo_preparacion: tiempoPreparacion.value,
      idCategoriaPlatillo: idCategoriaPlatillo.value
    })
    .then(() => router.push('/platillos'))
}

function goBack() {
  router.go(-1)
}

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
                  <RouterLink to="/platillos">Platillos</RouterLink>
                </li>
                <li class="breadcrumb-item active" aria-current="page">Crear</li>
              </ol>
            </nav>
            <h2>INSERTAR DATOS DEL PLATILLO</h2>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <form @submit.prevent="crearPlatillo">
        <div class="form-floating mb-3">
          <input type="text" class="form-control" v-model="nombre" placeholder="nombre" required />
          <label for="nombre">Nombre Platillo</label>
        </div>

        <div class="form-floating mb-3">
          <input type="text" class="form-control" v-model="urlPlatillo" placeholder="urlPlatillo" required />
          <label for="urlPlatillo">Url Platillo</label>
        </div>

        <div class="form-floating mb-3">
          <input type="number" class="form-control" v-model="precio" placeholder="Precio" required />
          <label for="precio">Precio</label>
        </div>

        <div class="form-floating mb-3">
          <input type="text" class="form-control" v-model="tiempoPreparacion" placeholder="Tiempo" required />
          <label for="tiempoPreparacion">Tiempo de Preparación</label>
        </div>

        <div class="form-floating mb-3">
          <input type="number" class="form-control" v-model="stock" placeholder="Stock" required />
          <label for="stock">Stock</label>
        </div>

        <div class="form-floating mb-3">
          <select v-model="idCategoriaPlatillo" class="form-select">
            <option v-for="categoria in categoria" :value="categoria.id">
              {{ categoria.nombre }}
            </option>
          </select>
          <label for="categoria">Nombre de la categoria</label>
        </div>

        <div class="text-center mt-3">
          <button type="submit" class="btn btn-primary btn-lg">
            <font-awesome-icon icon="fa-solid fa-floppy-disk" /> Crear Platillo
          </button>
        </div>
      </form>
    </div>

    <div class="text-left">
      <button class="btn btn-success" @click="goBack">Volver</button>
    </div>
  </div>
</template>

<style scoped></style>
