<template>
  <div class="header">
    <h1><strong>{{ titulo }}</strong></h1>
  </div>
</template>

<script>
export default {
  name: 'Cabezera',
  data() {
    return {
      titulo: 'Lista de Tareas'
    };
  }
};
</script>

<style scoped>
.header {
  background-color: #f0f0f0;
  padding: 20px;
  text-align: center;
}

.header h1 {
  color: #333;
  font-family: Arial, sans-serif;
}
</style>