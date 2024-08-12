<template>
  <div id="app">
    <Cabezera />
    <AgregarTareas />
  </div>
</template>

<script>
import Cabezera from './components/Cabezera.vue';
import AgregarTareas from './components/AgregarTareas.vue';

export default {
  name: 'App',
  components: {
    Cabezera,
    AgregarTareas,
  }
};
</script>
