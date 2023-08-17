<template>
  <v-container>
    <v-col cols="12">
      <v-row justify="center">
        <template v-for="pok in pokemons">
          <PokeCard :pokemon="pok"></PokeCard>
        </template>
      </v-row>
    </v-col>

  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import $axios from '@/plugins/axios';
import Pokemon from "@/models/Pokemon";
import StatusPokemon from '@/models/StatusPokemon';
// Components
import PokeCard from '@/components/PokeCard.vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    PokeCard
  },
  data() {
    return {
      pokemons: [] as Array<Pokemon>
    }
  },
  mounted() {
    this.buscarPokemons()
  },
  methods: {
    buscarPokemons() {
      $axios.get('pokemon')
        .then((resposta: any) => {
          resposta.data.results.forEach((pokemon: any) => {
            $axios.get(pokemon.url)
              .then((pok: any) => {
                let newPokemon =
                  new Pokemon(pok.data.id, pok.data.name, pok.data.height, pok.data.weight, pok.data.types[0].type.name,
                    pok.data.stats.map((s: any) => new StatusPokemon(s.stat.name, s.base_stat)), pok.data.sprites.other.home.front_default)
                this.pokemons.push(newPokemon);
                this.ordenarPokemons()
              })
              .catch((err: any) => {
                console.log(err)
              })

          });
        })
        .catch((erro: any) => {
          console.log(erro)
        })
    },
    ordenarPokemons() {
      this.pokemons.sort((a, b) => a.id - b.id)
    }
  }



});
</script>
