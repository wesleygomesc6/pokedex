<template>
  <v-app>
    <v-app-bar color="primary">
      <v-app-bar-title v-text="titulo.toUpperCase()"></v-app-bar-title>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
    <v-footer class="justify-center" app> &copy; {{ new Date().getFullYear() }} - {{ rodape }} </v-footer>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',

  data() {
    return {
      titulo: 'Pokédex',
      rodape: 'Wesley Gomes'
    }
  },
})
</script>
