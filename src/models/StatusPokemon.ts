export default class StatusPokemon {
    descricao!: string;
    valor!: number;
    constructor(descricao: string, valor: number) {
        this.descricao = descricao;
        this.valor = valor;
    }
}