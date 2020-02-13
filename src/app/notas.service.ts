import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment'
import { Links } from './links/links';
import { Anotacao } from './anotacoes/anotacao';
import { Senha } from './senha/senha';

@Injectable({
    providedIn: 'root'
})
export class NotasService {

    public url = environment.host
    public urlFB = environment.hostFireBbase

    constructor(private http: HttpClient) { }

    public getLinks(): Observable<Links[]> {
        return this.http.get<Links[]>(`${this.url}/links`);
    }

    public salvarLink(link: Links): Observable<Links> {
        return this.http.post<Links>(`${this.url}/links`, link);
    }

    public editarLink(link: Links): Observable<Links> {
        return this.http.put<Links>(`${this.url}/links/${link.id}`, link);
    }      

    public getAnotacoes(): Observable<Anotacao[]> {
        return this.http.get<Anotacao[]>(`${this.url}/anotacao/notas`);
    }

    public salvarAnotacao(anotacao: any): Observable<Anotacao> {
        return this.http.put<Anotacao>(`${this.url}/anotacao/notas`, anotacao);
    }

    public getItems(key: string) {
        return JSON.parse(localStorage.getItem(key))
    }

    public setItems(key: string, value: any) {
        localStorage.setItem(key, JSON.stringify(value))
    }

    public getSenhas(): Observable<Senha[]> {
        return this.http.get<Senha[]>(`${this.url}/senhas`);
    }

    public salvarSenhar(senha: Senha): Observable<Senha> {
        return this.http.post<Senha>(`${this.url}/senhas`, senha);
    }
    
    public editarSenha(senha: Senha): Observable<Senha> {
        console.log(senha);
        return this.http.put<Senha>(`${this.url}/senhas/${senha.id}`, senha)
    }

    // serviço para tela de editar - toda aplicação
    public edit(id: any, pathname: string): Observable<any> {
        return this.http.get<any>(`${this.url}/${pathname}/${id}`);
    } 

    // serviço para deletar toda aplicação
    public delete(id: any, pathname: string): Observable<any> {
        return this.http.delete(`${this.url}/${pathname}/${id}`);
    }

    // lista dados de senha do firebase
    public listarSenhasNuvem() {
        return this.http.get('https://meus-dados-8d039.firebaseio.com/senhas.json');
    }

    public salvarSenhaNuvem(senha: any) {
        return this.http.put("https://meus-dados-8d039.firebaseio.com/senhas/" + senha.id + ".json", senha);
    }

    public deletarSenhaNuvem(id: any) {
        return this.http.delete("https://meus-dados-8d039.firebaseio.com/senhas/" + id + ".json");
    }
}
