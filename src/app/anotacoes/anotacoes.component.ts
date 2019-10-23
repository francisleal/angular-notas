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

    isDisabled: boolean = false;
    isReadonly: boolean = false
    cards: any = []

    constructor(private notasService: NotasService) { }

    ngOnInit() {
        this.listarAnotacoes();
    }

    listarAnotacoes() {
        this.notasService.getAnotacoes().subscribe(
            cards => {
                this.cards = cards
                console.log(this.cards)
            }
        );
    }

    adicionar() {
        this.anotacao.id = Math.floor(Math.random() * 999999);
        this.cards.unshift({ id: this.anotacao.id });
        this.isDisabled = true;
    }

    salvar(anotacao: any) {
        this.isReadonly = true;
        console.log(this.anotacao = anotacao)
    }

    editar() {
        this.isReadonly = false
    }

    excluir(card: number) {
        // console.log(this.cards);
        console.log('id ', card);
        this.isDisabled = false;
    }
}
