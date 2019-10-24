import { Component, OnInit } from '@angular/core';
import { Anotacao } from './anotacao';
import { NotasService } from '../notas.service';

@Component({
    selector: 'app-anotacoes',
    templateUrl: './anotacoes.component.html',
    styleUrls: ['./anotacoes.component.css']
})
export class AnotacoesComponent implements OnInit {

    private anotacao: Anotacao = new Anotacao()
    private isReadonly: boolean = true
    private cards: any = []

    constructor(private notasService: NotasService) { }

    ngOnInit() {
        this.listarAnotacoes();
    }

    private listarAnotacoes() {
        this.notasService.getAnotacoes().subscribe(
            cards => this.cards = Object.values(cards)[1]
        );
    }

    private adicionar() {
        this.anotacao.id = Math.floor(Math.random() * 999999);
        this.cards.unshift({ id: this.anotacao.id });
        this.isReadonly = this.anotacao.id
    }

    private salvar(anotacao: any) {
        this.cards.unshift(anotacao)
        this.cards.shift()

        this.isReadonly = false

        this.salvarService(this.cards);
    }

    private editar() {
        this.isReadonly = false;
    }

    private excluir(card: number) {
        let exAnotacao = this.cards.filter((anotacao: Anotacao) => anotacao.id != card)
        this.cards = exAnotacao;

        this.salvarService(this.cards);
    }

    private salvarService(anotacoesParametro: any) {

        let anotacoes = { id: 'notas', notas: anotacoesParametro }

        this.notasService.salvarAnotacao(anotacoes).subscribe(
            sucesso => console.log('sucesso ', sucesso),
            error => console.log('error ', error)
        )
    }
}
