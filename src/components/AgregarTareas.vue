<template>
  <FuiltrosCategorias :categorias="categorias"/>
  <div class="input-group mb-3">
    <input type="text" v-model="nuevaTarea" class="form-control" placeholder="Escribe una nueva tarea"
      @keyup.enter="agregarTarea">
    <select v-model="categoriaSeleccionada" class="form-select">
      <option value="" disabled>Selecciona una categoría</option>
      <option v-for="(categoria, indice) in categorias" :key="indice" :value="categoria">{{ categoria }}</option>
    </select>
    <div>
      <input type="date" v-model="fechaTarea" class="form-control">
    </div>
    <button @click="agregarTarea" class="btn btn-primary">Agregar</button>
  </div>
  <Table :tareas="tareas" :fields="fields" @cambiar-estado="cambiarEstado" @borrar-tarea="borrarTarea" />
</template>

<script>

import FuiltrosCategorias from './FuiltrosCategorias.vue';
import Table from './Table.vue';

export default {
  name: 'AgregarTareas',
  data() {
    return {
      nuevaTarea: '',
      categoriaSeleccionada: '',
      fechaTarea: '',
      categorias: [],
      fields: ['Objetivo', 'Categoría', 'Estado', 'Fecha', 'Acciones'],
      tareas: JSON.parse(localStorage.getItem('tareas')) || [],
    };
  },
  components: {
    FuiltrosCategorias,
    Table
  },
  methods: {
    obtenerCategorias() {
      const categoriasGuardadas = localStorage.getItem('categorias');
      if (categoriasGuardadas) {
        this.categorias = JSON.parse(categoriasGuardadas);
      }
    },
    agregarTarea() {
      const objetivo = this.nuevaTarea.trim();
      const categoria = this.categoriaSeleccionada;
      const fecha = this.fechaTarea;
      const estado = false;
      if (objetivo.trim() !== '' && categoria != null) {
        this.tareas.push({
          objetivo,
          estado,
          fecha,
          categoria
        });
      }
      this.actualizarLocalStorage();
      this.nuevaTarea = '';
      this.categoriaSeleccionada = '';
      this.fechaTarea = '';
    },

    cambiarEstado(indice) {
      this.tareas[indice].estado = !this.tareas[indice].estado;
      this.actualizarLocalStorage();
    },

    borrarTarea(indice) {
      this.tareas.splice(indice, 1);
      this.actualizarLocalStorage();
    },
    actualizarLocalStorage() {
      localStorage.setItem('tareas', JSON.stringify(this.tareas));
    },
  },
  mounted() {
    this.$emit('tareas-actualizadas', this.tareas);
    this.obtenerCategorias();
  }
};
</script>