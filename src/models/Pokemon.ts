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
        this.altura = altura * 10;
        this.peso = peso / 10;
        this.tipo = tipo;
        this.statusPokemon = statusPokemon;
        this.imgUrl = imgUrl;
    }
}