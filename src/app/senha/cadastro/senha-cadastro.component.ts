import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';

import { Senha } from '../senha';
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
    public inscricao: Subscription
    public pathname: string = 'senhas'
    public pageSalve: boolean = true

    constructor(
    private fb: FormBuilder,
     private route: ActivatedRoute,
     private router: Router,
     private NotasService: NotasService,
     private Alerta: AlertService) { }

    ngOnInit() {
        this.initFormularioSenha();
        this.paginaEditar();
    }

    ngOnDestroy() {
        this.inscricao.unsubscribe();
    }

    private initFormularioSenha() {
        this.formularioSenha = this.fb.group({
            nome: [null, Validators.compose([
                Validators.required,
                Validators.minLength(4)
            ])],
            senha: [null, Validators.compose([Validators.required])]
        })
    }

    public salvarSenha() {
        window.location.hash == '#/senhas/add' ? this.salve() : this.edit()
    }

    public voltar() {
        this.router.navigate([`/${this.pathname}`])
    }

    private salve() {
        const dadosFormulario = this.formularioSenha.value

        const senha = new Senha(
            this.formularioID = Math.floor(Math.random() * 9999999),
            dadosFormulario.nome,
            dadosFormulario.senha
        )

        this.NotasService.salvarSenhar(senha).subscribe(
            alert => this.salveSucess(alert.nome),
            error => this.salveError(error)
        )
    }

    private edit() {
        const dadosFormulario = this.formularioSenha.value
        
        this.inscricao = this.route.params.subscribe(
            route => {                    
                if (typeof route.id != 'undefined') {

                    const senha = new Senha(route.id, dadosFormulario.nome, dadosFormulario.senha)

                    this.NotasService.editarSenha(senha).subscribe(
                        alert => this.salveSucess(alert.nome),
                        error => this.salveError(error)
                    )
                }
            }
        )
    }

    private salveSucess(mensage: string) {
        this.Alerta.sucesso(`Senha "${mensage}" salva com sucesso`)
        this.voltar()
    }

    private salveError(mensage: string) {
        this.Alerta.danger(`Erro ao salvar a senha ${mensage}`)
    }

    private paginaEditar() {
        this.inscricao = this.route.params.subscribe(
            route => {
                if (typeof route.id != 'undefined') {

                    this.NotasService.edit(route.id, this.pathname).subscribe(
                        campo => {
                            this.formularioSenha.controls['nome'].setValue(campo.nome)
                            this.formularioSenha.controls['senha'].setValue(campo.senha)
                        },
                        error => this.Alerta.danger(`ERROR - ${error.message}`)
                    )

                    this.pageSalve = false
                }
            }
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