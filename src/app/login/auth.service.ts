import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { Usuario } from './usuario';
import { AlertService } from '../alert/alert.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private usuarioAutenticado: boolean = false

    public mostarMenuEmitter = new EventEmitter<boolean>()

    constructor(
        private router: Router,
        private alertService: AlertService
    ) { }

    logar(usuario: Usuario) {
        if (usuario.nome == 'email@email.com' && usuario.senha == '123456') {

            this.usuarioAutenticado = true

            this.mostarMenuEmitter.emit(true)

            this.router.navigate(['/'])

        } else {
            this.usuarioAutenticado = false;
            this.mostarMenuEmitter.emit(false)
            this.alertService.danger('login inválido')
        }
    }
}
