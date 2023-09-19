import { AxiosResponse } from "axios";
import StatusPokemon from "./StatusPokemon";

export default class Pokemon {
    id!: number;
    nome!: string;
    altura!: number;
    peso!: number;
    tipo!: string;
    statusPokemon!: StatusPokemon[];
    imgUrl!: string;

    constructor(id: number, nome: string, altura: number, peso: number, tipo: string, statusPokemon: StatusPokemon[], imgUrl: string) {
        this.id = id;
        this.nome = nome;
        this.altura = altura ? altura * 10 : 0;
        this.peso = peso ? peso / 10 : 0;
        this.tipo = tipo;
        this.statusPokemon = statusPokemon;
        this.imgUrl = imgUrl;
    }

    static converterPokemon(pok: AxiosResponse): Pokemon {
        const newPokemon =
            new Pokemon(pok.data.id, pok.data.name, pok.data.height, pok.data.weight, pok.data.types[0].type.name,
                pok.data.stats.map((st: any) => new StatusPokemon(st.stat.name, st.base_stat)), pok.data.sprites.other.home.front_default);

        return newPokemon;

    }
}