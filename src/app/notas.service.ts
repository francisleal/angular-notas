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

    public edit(id: any): Observable<any> {
        return this.http.get<any>(`${this.url}/links/${id}`);
    }

    public delete(id: string): Observable<any> {
        return this.http.delete(`${this.url}/links/${id}`);
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

    public deletarSenha(id: number): Observable<any> {
        return this.http.delete(`${this.url}/senhas/${id}`)
    }
}
