import { Component, OnInit } from '@angular/core';
import { Anotacao } from './anotacao';
import { NotasService } from '../notas.service';
import { AlertService } from '../alert/alert.service';

@Component({
    selector: 'app-anotacoes',
    templateUrl: './anotacoes.component.html',
    styleUrls: ['./anotacoes.component.css']
})
export class AnotacoesComponent implements OnInit {

    private anotacao: Anotacao = new Anotacao()
    public isReadonly: boolean = true
    public cards: any = []

    constructor(
        private notasService: NotasService,
        private alert: AlertService
    ) { }

    ngOnInit() {
        this.listarAnotacoes();
    }

    private listarAnotacoes() {
        this.notasService.getAnotacoes().subscribe(
            cards => this.cards = Object.values(cards)[1]
        );
    }

    public adicionar() {
        this.anotacao.id = Math.floor(Math.random() * 999999);
        this.cards.unshift({ id: this.anotacao.id });
        this.isReadonly = this.anotacao.id
    }

    public salvar(anotacao: any) {
        this.cards.unshift(anotacao)
        this.cards.shift()

        this.isReadonly = false

        this.salvarService(this.cards, 'salvo');
    }

    public editar() {
        this.isReadonly = false;
    }

    public excluir(card: number) {
        let exAnotacao = this.cards.filter((anotacao: Anotacao) => anotacao.id != card)
        this.cards = exAnotacao;

        this.salvarService(this.cards, 'excluido');
    }

    private salvarService(anotacoesParametro: any, alertMensagem: string) {

        let anotacoes = { id: 'notas', notas: anotacoesParametro }

        this.notasService.salvarAnotacao(anotacoes).subscribe(
            sucesso => {
                if (alertMensagem === 'salvo') {
                    this.alert.sucesso(`${alertMensagem} - com sucesso`)
                } else {
                    this.alert.danger(`${alertMensagem} - com sucesso`)
                }
            },
            error => this.alert.danger(`ERROR - ${error.message}`)
        )
    }
}
