import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Senha } from '../senha';

@Component({
    selector: 'app-senha-cadastro',
    templateUrl: './senha-cadastro.component.html',
    styleUrls: ['../senha.component.css']
})

export class SenhaCadastroComponent implements OnInit {

    formularioSenha: FormGroup

    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        this.initFormularioSenha();
    }

    salvarSenha() {
        const dadosFormulario = this.formularioSenha.value

        const senha = new Senha(
            dadosFormulario.nome,
            dadosFormulario.senha
        )

        console.log(senha)
    }

    initFormularioSenha() {
        this.formularioSenha = this.fb.group({
            nome: [null, Validators.compose([
                Validators.required,
                Validators.minLength(4)
            ])],
            senha: [null, Validators.compose([Validators.required])]
        })
    }

    get nome() {
        return this.formularioSenha.get('nome');
    }

}