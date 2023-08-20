<template>
    <v-container class="d-flex justify-space-between">
        <v-btn color="primary" icon="mdi-arrow-left" size="small" title="Voltar" 
        @click="$emit('pagina-anterior')"></v-btn>
        <v-btn color="primary" icon="mdi-arrow-right" size="small" title="Próxima"
        @click="$emit('proxima-pagina')"></v-btn>
    </v-container>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'Paginacao',
})
</script>