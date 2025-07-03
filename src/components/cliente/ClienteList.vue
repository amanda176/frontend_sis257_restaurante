<script setup lang="ts">
import type { Cliente } from '@/models/cliente'
import { onMounted, ref } from 'vue'
import http from '@/plugins/axios'
import router from '@/router'
import { useAuthStore } from '@/stores'
const authStore = useAuthStore
  ()
const props = defineProps<{
  //esto se copia 7-11
  ENDPOINT_API: string //variable que vien del view/Categoria
}>()

const ENDPOINT = props.ENDPOINT_API ?? ''
var clientes = ref<Cliente[]>([]) //creamos la variable plural quie tomara loscalores de models/categorias

async function getClientes() {
  clientes.value = await http.get(ENDPOINT).then((response) => response.data) //para listar hace get del backend
}

function editar(id: number) {
  router.push(`/clientes/editar/${id}`)
}

async function eliminar(id: number) {
  var r = confirm('¿Está seguro que se desea eliminar el Categoria?')
  if (r == true) {
    await http.delete(`${ENDPOINT}/${id}`).then(() => getClientes())
  }
}

onMounted(() => getClientes())
</script>

<template>
  <br /><br /><br />
  <div v-if="authStore.token">
    <div class="find-us">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="section-heading">
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <RouterLink to="/">Inicio</RouterLink>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">Categoria</li>
                </ol>
              </nav>
              <h2 style="font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif">
                Lista de Clientes
              </h2>
              <div class="col-12"></div>
            </div>
            <RouterLink to="/clientes/crear">Crear Nueva Cliente </RouterLink>
          </div>
        </div>
      </div>
    </div>
    <br />
    <div class="container">
      <div class="table-responsive">
        <table class="table table-bordered">
          <thead>
            <tr style="background-color: black">
              <th style="color: #e49e48">#</th>
              <th style="color: #e49e48">CI</th>
              <th style="color: #e49e48">Nombre</th>
              <th style="color: #e49e48">Celular</th>
              <th style="color: #e49e48">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(cliente, index) in clientes" :key="cliente.id" style="background-color: black">
              <td style="color: #f8cb2e">{{ index + 1 }}</td>
              <td style="color: #f8cb2e">{{ cliente.cedula_identidad }}</td>
              <td style="color: #f8cb2e">{{ cliente.nombreCompleto }}</td>
              <td style="color: #f8cb2e">{{ cliente.celular }}</td>
              <td>
                <button class="btn text-success" @click="editar(cliente.id)">
                  <font-awesome-icon icon="fa-solid fa-edit" />
                </button>
                <button class="btn text-danger" @click="eliminar(cliente.id)">
                  <font-awesome-icon icon="fa-solid fa-trash" />
                </button>
                
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
