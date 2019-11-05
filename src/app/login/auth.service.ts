import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { Usuario } from './usuario';
import { AlertService } from '../alert/alert.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    public mostarMenuEmitter = new EventEmitter<boolean>()

    constructor(
        private router: Router,
        private alertService: AlertService
    ) { }

    logar(usuario: Usuario) {
        if (usuario.nome == 'email@email.com' && usuario.senha == '123456') {
            this.usuarioAutenticado()
        } else {
            this.usuarioInvalido()
        }
    }

    remember(usuarioAutenticado: boolean) {
        if (usuarioAutenticado == true)
            this.usuarioAutenticado()
    }

    private usuarioAutenticado() {
        this.mostarMenuEmitter.emit(true)
        this.router.navigate(['/'])
    }

    private usuarioInvalido() {
        this.mostarMenuEmitter.emit(false)
        this.alertService.danger('login inválido')
    }
}
