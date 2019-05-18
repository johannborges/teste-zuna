import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(
        private router: Router
    ){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(localStorage.getItem("token") === "as4d6g5asd46g86sadg65sd4g"){
            let response;

            const authReq = req.clone();

            response = next.handle(authReq);

            return response.pipe(tap(data => { }, err => {
                if (err.status == 500) {
                    alert("Erro ao se comunicar com o servidor. Tente novamente mais tarde.");
                }
            }));
        }

        else{
            Swal.fire({
                title: "Sua sessão expirou",
                text: "Faça login novamente",
                type: "warning",
                confirmButtonText: "Ok"
            });
            
            this.router.navigate(['/auth/login']);
        }
    }
}