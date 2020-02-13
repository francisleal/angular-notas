import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AlertService } from 'src/app/alert/alert.service';
import { NotasService } from 'src/app/notas.service';
import { Senha } from 'src/app/senha/senha';

@Component({
    selector: 'app-senha',
    templateUrl: './senha.component.html',
    styleUrls: ['./senha.component.css']
})
export class SenhaComponent implements OnInit {

    public formularioSenha: FormGroup;
    public senhas: any = [];
    public loading: boolean = true;
    public btnAdicionar: boolean = true;

    private idSalvoNaVariavel: any;

    constructor(
        private fb: FormBuilder,
        private NotasService: NotasService,
        private Alert: AlertService
    ) { }

    ngOnInit() {
        this.initFormularioSenha()
        this.listarSenhaNuvem()
    }

    private initFormularioSenha() {
        this.formularioSenha = this.fb.group({
            nome: [null, Validators.compose([Validators.required, Validators.minLength(4)])],
            senha: [null, Validators.compose([Validators.required])]
        })
    }

    private listarSenhaNuvem() {
        this.NotasService.listarSenhasNuvem().subscribe(
            sucesso => {
                this.senhas = Object.values(sucesso)
                this.loading = false
            },
            error => this.Alert.danger(`ERROR - ${error.message}`)
        )
    }

    public editarSalvarSenhaNuvem() {

        const dadosFormulario = this.formularioSenha.value

        if (this.btnAdicionar === true) {
            this.idSalvoNaVariavel = Math.floor(Math.random() * 9999999)
        }

        let senha = {
            id: this.idSalvoNaVariavel,
            nome: dadosFormulario.nome,
            password: dadosFormulario.senha
        }

        this.NotasService.salvarSenhaNuvem(senha).subscribe(
            sucesso => {
                this.listarSenhaNuvem()
                this.Alert.sucesso(`senha ${senha.nome} salva com sucesso`)
            },
            error => this.Alert.danger(`ERROR - ${error.message}`)
        )

        this.btnAdicionar = true

        this.formularioSenha.reset()
    }

    public cancelar() {
        this.btnAdicionar = true
        this.formularioSenha.reset()
    }

    public editarSenha(senha: any) {
        this.nome.setValue(senha.nome)
        this.senha.setValue(senha.password)

        this.idSalvoNaVariavel = senha.id

        this.btnAdicionar = false
    }

    public deletarSenhaNuvem(id: any) {
        this.NotasService.deletarSenhaNuvem(id).subscribe(
            sucesso => {
                this.listarSenhaNuvem()
                this.Alert.sucesso('Senha excluida com sucesso')
            },
            error => this.Alert.danger(`ERROR - ${error.message}`)
        )
    }

    // Propriedades do formulário que vamos utilizar para obter os erros
    get nome() {
        return this.formularioSenha.get('nome')
    }

    get senha() {
        return this.formularioSenha.get('senha')
    }

}