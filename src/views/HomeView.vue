<template>
  <v-container>
    <v-col cols="12">
      <Paginacao @pagina-anterior="buscarPokemons('anterior')" @proxima-pagina="buscarPokemons('proxima')" />
    </v-col>
    <v-col cols="12">
      <v-row justify="center">
        <template v-for="pok in pokemons">
          <PokeCard :pokemon="pok"></PokeCard>
        </template>
      </v-row>
    </v-col>
    <v-col cols="12">
      <Paginacao @pagina-anterior="buscarPokemons('anterior')" @proxima-pagina="buscarPokemons('proxima')" />
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
import Paginacao from '@/components/Paginacao.vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    PokeCard,
    Paginacao
  },
  data() {
    return {
      pokemons: [] as Array<Pokemon>,
      nextPrevius: {
        next: '',
        previous: ''
      }
    }
  },
  mounted() {
    this.buscarPokemons(null);
  },
  methods: {
    buscarPokemons(paginacao: string | null): void {
      this.pokemons = [];
      let url = '';

      if (paginacao != 'proxima' && paginacao != 'anterior') {
        url = 'pokemon';
      } else if (paginacao == 'proxima') {
        url = this.nextPrevius.next;
      } else {
        url = this.nextPrevius.previous;
      }

      $axios.get(url)
        .then((resposta: any) => {
          this.nextPrevius.next = resposta.data.next;
          this.nextPrevius.previous = resposta.data.previous;

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
