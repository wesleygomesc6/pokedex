<template>
  <v-container id="impressao">
    <v-col cols="12">
      <Paginacao @pagina-anterior="buscarPokemons(pagina.previous)" @proxima-pagina="buscarPokemons(pagina.next)" />
    </v-col>
    <v-col cols="12">
      <v-alert v-model="alertarAlgo" type="warning" :title="alerta.titulo" :text="alerta.mensagem" closable
        variant="tonal">
      </v-alert>
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
import NomesPokemons from '@/models/NomesPokemons';
// Components
import PokeCard from '@/components/PokeCard.vue';
import Paginacao from '@/components/Paginacao.vue';
import { AxiosError, AxiosResponse } from 'axios';

export default defineComponent({
  name: 'HomeView',
  components: {
    PokeCard,
    Paginacao
  },
  data() {
    return {
      pokemons: [] as Array<Pokemon>,
      nomesPokemons: new NomesPokemons(),
      pagina: {
        next: '',
        previous: ''
      },
      alertarAlgo: false,
      alerta: {
        titulo: '',
        mensagem: ''
      }
    }
  },
  mounted() {
    this.buscarPokemons(null);
  },
  methods: {
    buscarPokemons(paginacao: string | null): void {
      this.pokemons = [];
      const url = !paginacao ? 'pokemon' : paginacao;

      $axios.get(url)
        .then((resposta: AxiosResponse) => {
          this.pagina.next = resposta.data.next;
          this.pagina.previous = resposta.data.previous;

          resposta.data.results.forEach((pokemon: any) => {
            $axios.get(pokemon.url)
              .then((pok: AxiosResponse) => {
                this.pokemons.push(this.converterRespToPokemon(pok));
                this.ordenarPokemons()
              })
              .catch((err: AxiosError) => {
                this.alertarMensagem(err);
                this.alertarAlgo = true;
              })

          });
        })
        .catch((erro: AxiosError) => {
          this.alertarMensagem(erro);
          this.alertarAlgo = true;
        })
    },
    alertarMensagem(mensagem: AxiosError): void {
      this.alerta = {
        titulo: mensagem.name,
        mensagem: mensagem.message
      }
    },
    converterRespToPokemon(pok: AxiosResponse): Pokemon {
      const newPokemon =
        new Pokemon(pok.data.id, pok.data.name, pok.data.height, pok.data.weight, pok.data.types[0].type.name,
          pok.data.stats.map((st: any) => new StatusPokemon(st.stat.name, st.base_stat)), pok.data.sprites.other.home.front_default);

      return newPokemon;
    },
    ordenarPokemons(): void {
      this.pokemons.sort((a, b) => a.id - b.id)
    }
  }



});
</script>
