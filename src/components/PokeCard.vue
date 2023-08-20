<template>
    <v-hover v-slot="{ isHovering, props }">
        <v-card width="250px" class="ma-2" v-bind="props" :elevation="isHovering ? 18 : 4"
            @click.prevent="detalharPokemon()">
            <v-card-title class="py-1">
                <v-row justify="space-between" class="ma-1">
                    <span>#{{ pokemon.id }} </span>
                    <span> {{ pokemon.nome.toUpperCase() }}</span>

                </v-row>
            </v-card-title>
            <v-card-subtitle>
                <v-row justify="space-between" class="ma-1">
                    <span>Tipo: </span>
                    <span>{{ pokemon.tipo }}</span>
                </v-row>
            </v-card-subtitle>
            <v-card-text class="py-1">
                <v-img :src="pokemon.imgUrl" class="my-2"></v-img>
                <v-row justify="space-between" class="ma-1">
                    <span>Altura: </span>
                    <span>{{ pokemon.altura }}cm</span>
                </v-row>
                <v-row justify="space-between" class="ma-1">
                    <span>Peso: </span>
                    <span>{{ pokemon.peso }}kg</span>
                </v-row>
            </v-card-text>
        </v-card>
    </v-hover>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: ['pokemon'],
    methods: {
        detalharPokemon() {
            alert('oi')
        }
    }
})
</script>