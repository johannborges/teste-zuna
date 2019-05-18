import { Injectable } from '@angular/core';

import { Estagiario } from '../models/estagiario.model';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class EstagiariosServiceMock {
    getEstagiarios(): Observable<Array<Estagiario>>{
        return of([
            new Estagiario(
                1, "Estagiário teste 1", "estagiario1@teste.com", "999.999.999-99", "(51) 99999-9999"
            ),

            new Estagiario(
                2, "Estagiário teste 2", "estagiario2@teste.com", "999.999.999-99", "(51) 99999-9999"
            ),

            new Estagiario(
                3, "Estagiário teste 3", "estagiario3@teste.com", "999.999.999-99", "(51) 99999-9999"
            )
        ]);
    }

    getEstagiario(id: string): Observable<Estagiario>{
        return of(new Estagiario(
            1, "Estagiário teste 1", "estagiario1@teste.com", "999.999.999-99", "(51) 99999-9999"
        ));
    }

    createEstagiario(
        name: string,
        email: string,
        cpf: string,
        phoneNumber: string
    ){
        return of(true);
    }

    completeEstagiario(
        id: string,
        name: string,
        email: string,
        cpf: string,
        phoneNumber: string,
        birthday: string,
        cep: string,
        city: string,
        fu: string,
        university: string,
        course: string,
        campus: string,
        turn: string,
        semester: string,
        finishEta: string
    ){
        return of(true);
    }

    deleteEstagiario(id: string){
        return of(true);
    }
}