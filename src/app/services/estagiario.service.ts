import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

import { Estagiario } from '../models/estagiario.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class EstagiarioService {
    constructor(
        private httpClient: HttpClient
    ){}

    getEstagiarios(): Observable<Array<Estagiario>>{
        return this.httpClient.get<Array<Estagiario>>(`${environment.uri}estagiario`);
    }

    getEstagiario(id: string): Observable<Estagiario>{
        return this.httpClient.get<Estagiario>(`${environment.uri}estagiario/${id}`);
    }

    createEstagiario(name: string, email: string, cpf: string, phoneNumber: string){
        let date = new Date().toISOString();

        return this.httpClient.post(`${environment.uri}estagiario/`, {
            "name": name,
            "email": email,
            "cpf": cpf,
            "phoneNumber": phoneNumber
        });
    }

    editEstagiario(id: string, name: string, email: string, cpf: string, phoneNumber: string){
        return this.httpClient.put(`${environment.uri}estagiario/${id}`, {
            "name": name,
            "email": email,
            "cpf": cpf,
            "phoneNumber": phoneNumber
        });
    }

    deleteEstagiario(id: string){
        return this.httpClient.delete(`${environment.uri}estagiario/${id}`);
    }
}