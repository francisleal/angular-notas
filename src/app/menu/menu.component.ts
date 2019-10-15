import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

    home: string = '';
    anotacoes: string = '';
    login: string = '';
    links: string = '';

    constructor() { }

    removeActive() {
        this.home = '';
        this.anotacoes = '';
        this.login = '';
        this.links = '';
    }

    menuActive(active: any) {
        this.removeActive();

        switch (active) {
            case 'home':
                this.home = 'active';
                break;
            case 'anotacoes':
                this.anotacoes = 'active';
                break;
            case 'login':
                this.login = 'active';
                break;
            case 'links':
                this.links = 'active';
                break;
            default:
                break;
        }
    }

    initActive() {
        if (window.location.hash == '#/home') {
            this.home = 'active';
        }
        if (window.location.hash == '#/anotacoes') {
            this.anotacoes = 'active';
        }
        if (window.location.hash == '#/login') {
            this.login = 'active';
        }
        if (window.location.hash == '#/links') {
            this.login = 'active';
        }
    }

    ngOnInit() {
        this.initActive();
    }
}
