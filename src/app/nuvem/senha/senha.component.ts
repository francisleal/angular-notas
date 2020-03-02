import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AlertService } from 'src/app/alert/alert.service';
import { NotasService } from 'src/app/notas.service';

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
    public pathname: string = 'senhas';
    public mostrarPassword: any;

    private dadosFormularioID: number;

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
        this.NotasService.listarfb(this.pathname).subscribe(
            sucesso => this.listaSucesso(sucesso),
            error => this.AlertError(error)
        )
    }

    private listaSucesso(data: any) {
        this.senhas = Object.values(data)
        this.loading = false
    }

    private AlertError(errorMessage: string) {
        this.Alert.danger(`Error -  ${errorMessage}`)
    }

    private AlertSucesso(sucessoMessage: string) {
        this.listarSenhaNuvem()
        this.Alert.sucesso(sucessoMessage)
    }

    public editarSalvarSenhaNuvem() {

        const dadosFormulario = this.formularioSenha.value

        if (this.btnAdicionar === true) {
            this.dadosFormularioID = Math.floor(Math.random() * 9999999)
        }

        let senha = {
            id: this.dadosFormularioID,
            nome: dadosFormulario.nome,
            password: dadosFormulario.senha
        }

        this.NotasService.salvarfb(senha, this.pathname).subscribe(
            sucesso => this.AlertSucesso(`senha ${senha.nome} salva com sucesso`),
            error => this.AlertError(error)
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
        this.dadosFormularioID = senha.id
        this.btnAdicionar = false
    }

    public deletarSenhaNuvem(id: number) {
        this.NotasService.deletarfb(id, this.pathname).subscribe(
            sucesso => this.AlertSucesso('Senha excluida com sucesso'),
            error => this.AlertError(error)
        )
    }

    public mostrarSenha(senha: any, index: number) {

        this.mostrarPassword = index

        console.log(this.mostrarPassword)

        console.log(senha, index)
    }

    // Propriedades do formulário que vamos utilizar para obter os erros
    get nome() {
        return this.formularioSenha.get('nome')
    }

    get senha() {
        return this.formularioSenha.get('senha')
    }
}