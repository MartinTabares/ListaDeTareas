<template>
<div class="filtros-categorias">
  <div class="filtros">
    <label for="categoria">Filtrar por categoría:</label>
    <select v-model="categoriaSeleccionada" @change="filtrarTareas" class="mr-3">
      <option value="">Todas</option>
      <option v-for="categoria in categorias" :key="categoria" :value="categoria">{{ categoria }}</option>
    </select>
    <label for="ordenar">Ordenar por fecha:</label>
    <select v-model="ordenSeleccionado" @change="ordenarTareas" class="mr-3">
      <option value="asc">Ascendente</option>
      <option value="desc">Descendente</option>
    </select>
    <input type="text" v-model="nuevaCategoria" class="form-control" placeholder="Nueva categoría"
      @keyup.enter="agregarCategoria" />
      <button @click="agregarCategoria" class="btn btn-secondary">Agregar Categoría</button>
    </div>
</div>
  <ul>
    <li v-for="tarea in tareasFiltradas" :key="tarea.id">
      {{ tarea.nombre }} - {{ tarea.categoria }} - {{ tarea.fecha }}
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    categorias: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      nuevaCategoria: '',
      categoriaSeleccionada: '',
      ordenSeleccionado: 'asc',
      tareas: JSON.parse(localStorage.getItem('tareas')) || [],
      tareasFiltradas: []
    };
  },
  methods: {
    agregarCategoria() {
      const categoria = this.nuevaCategoria.trim();
      if (categoria && !this.categorias.includes(categoria)) {
        this.categorias.push(categoria);
        this.nuevaCategoria = '';
        this.actualizarLocalStorage();
      }
    },
    filtrarTareas() {
      this.tareasFiltradas = this.tareas.filter(tarea => {
        return this.categoriaSeleccionada === '' || tarea.categoria === this.categoriaSeleccionada;
      });
      this.ordenarTareas();
    },
    ordenarTareas() {
      this.tareasFiltradas.sort((a, b) => {
        if (this.ordenSeleccionado === 'asc') {
          return new Date(a.fecha) - new Date(b.fecha);
        } else {
          return new Date(b.fecha) - new Date(a.fecha);
        }
      });
    },
    actualizarLocalStorage() {
      localStorage.setItem('categorias', JSON.stringify(this.categorias));
    },
  }
};
</script>

<style scoped>
.filtros-categorias {
  display: flex;
  flex-direction: column;
}

.filtros {
  display: flex;
  align-items: center;
}

.filtros select {
  margin-left: 0,1rem;
}
.filtros input {
  margin-left: 1rem;
}

.filtros .form-control {
  width: auto;
}
</style>
