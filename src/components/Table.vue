<template>
  <table class="table">
    <thead>
      <tr>
        <th v-for="field in fields" :key="field">{{ field }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(tarea, indice) in tareas" :key="indice" :class="{ listo: tarea.estado }">
        <td>{{ tarea.objetivo }}</td>
        <td>{{ tarea.categoria }}</td>
        <td>{{ tarea.estado ? 'Completada' : 'Pendiente' }}</td>
				<td>{{ tarea.fecha }}</td>
        <td>
          <button class="btn btn-success btn-sm me-2" @click="$emit('cambiar-estado', indice)">Lista</button>
          <button class="btn btn-danger btn-sm" @click="$emit('borrar-tarea', indice)">Borrar</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    tareas: {
      type: Array,
      required: true
    },
		fields: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.listo {
  text-decoration: line-through;
}
</style>