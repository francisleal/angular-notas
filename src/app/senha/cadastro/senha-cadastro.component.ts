import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Senha } from '../senha';
import { Router } from '@angular/router';
import { NotasService } from 'src/app/notas.service';
import { AlertService } from 'src/app/alert/alert.service';

@Component({
    selector: 'app-senha-cadastro',
    templateUrl: './senha-cadastro.component.html',
    styleUrls: ['../senha.component.css']
})

export class SenhaCadastroComponent implements OnInit {

    public formularioSenha: FormGroup
    public formularioID: number

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private NotasService: NotasService,
        private Alerta: AlertService) { }

    ngOnInit() {
        this.initFormularioSenha();
    }

    public initFormularioSenha() {
        this.formularioSenha = this.fb.group({
            nome: [null, Validators.compose([
                Validators.required,
                Validators.minLength(4)
            ])],
            senha: [null, Validators.compose([Validators.required])]
        })
    }

    public salvarSenha() {
        const dadosFormulario = this.formularioSenha.value

        const senha = new Senha(
            this.formularioID = Math.floor(Math.random() * 9999999),
            dadosFormulario.nome,
            dadosFormulario.senha
        )

        this.NotasService.salvarSenhar(senha).subscribe(
             alert => {
                this.Alerta.sucesso(`Senha "${alert.nome}" salva com sucesso`)
                this.voltar();
            },
            error => this.Alerta.danger(`Erro ao salvar a senha ${error}`)
        )
    }

    public voltar() {
        this.router.navigate(['/senhas']);
    }

    // Propriedades do formulário que vamos utilizar para obter os erros
    get nome() {
        return this.formularioSenha.get('nome');
    }

    get senha() {
        return this.formularioSenha.get('senha');
    }

}