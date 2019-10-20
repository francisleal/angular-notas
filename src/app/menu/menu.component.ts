import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

    public menuActive: string;

    constructor() { }

    initActive() {
        switch (window.location.hash) {
            case '#/home':
                this.menuActive = 'home';
                break;
            case '#/anotacoes':
                this.menuActive = 'anotacoes';
                break;
            case '#/links':
                this.menuActive = 'links';
                break;
            case '#/login':
                this.menuActive = 'login';
                break;
            default:
                break;
        }
    }

    ngOnInit() {
        this.initActive();
    }
}
