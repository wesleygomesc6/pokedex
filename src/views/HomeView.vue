<template>
  <v-container>
    <v-row class="ma-2 px-10" justify="end" align-content="center">
      <v-col cols="12" sm="4">
        <v-autocomplete v-model="nomePokemon" :items="nomesPokemons.nomes" variant="outlined" density="compact"
          item-title="name" return-object label="Digite o nome do pokemon">
        </v-autocomplete>
      </v-col>
      <v-col cols="12" sm="2">
        <v-btn color="primary" class="mx-1" title="Buscar pokemon" @click="buscarPokeminIndividual(nomePokemon.url)">Buscar</v-btn>
        <v-btn color="warning" class="mx-1" title="Limpar busca" @click="buscarPokemons(null)">Limpar</v-btn>
      </v-col>
    </v-row>
    <v-col cols="12">
      <v-alert v-model="alertarAlgo" type="warning" :title="alerta.titulo" :text="alerta.mensagem" closable
        variant="tonal">
      </v-alert>
      <v-row justify="center" align-content="center" v-if="loading" class="loading">
        <v-progress-circular size="50" color="primary" indeterminate></v-progress-circular>
      </v-row>
      <v-row justify="center" v-else>
        <template v-for="pok in pokemons">
          <PokeCard :pokemon="pok"></PokeCard>
        </template>
      </v-row>
    </v-col>
    <v-col cols="12">
      <Paginacao @pagina-anterior="buscarPokemons(pagina.previous)" @proxima-pagina="buscarPokemons(pagina.next)" />
    </v-col>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import $axios from '@/plugins/axios';
import Pokemon from "@/models/Pokemon";
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
      nomePokemon: {
        name: '',
        url: ''
      },
      loading: false,
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
      this.loading = true;
      this.pokemons = [];
      this.limpar();
      const url = !paginacao ? 'pokemon' : paginacao;

      $axios.get(url)
        .then((resposta: AxiosResponse) => {
          this.pagina.next = resposta.data.next;
          this.pagina.previous = resposta.data.previous;

          resposta.data.results.forEach((pokemon: any) => {
            this.buscarPokeminIndividual(pokemon.url);
          });
          this.loading = false;
        })
        .catch((erro: AxiosError) => {
          this.alertarMensagem(erro);
          this.alertarAlgo = true;
          this.loading = false;
        })
    },
    buscarPokeminIndividual(urlPokemon: string): void {
      $axios.get(urlPokemon)
        .then((pok: AxiosResponse) => {
          if (this.nomePokemon.name) {
            this.pokemons = [];
            this.pokemons.push(Pokemon.converterPokemon(pok));
          } else {

            this.pokemons.push(Pokemon.converterPokemon(pok));
          }
        })
        .catch((err: AxiosError) => {
          this.alertarMensagem(err);
          this.alertarAlgo = true;
        })
      this.ordenarPokemons()
    },
    alertarMensagem(mensagem: AxiosError): void {
      this.alerta = {
        titulo: mensagem.name,
        mensagem: mensagem.message
      }
    },
    ordenarPokemons(): void {
      this.pokemons.sort((a, b) => a.id - b.id)
    },
    limpar():void {
      this.nomePokemon = {
        name: '',
        url: ''
      }
    }
  }



});
</script>
<style>
.loading {
  height: 50vh;
}
</style>