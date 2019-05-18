import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent{
    constructor(
        private router: Router
    ){
        router.events.subscribe((val) => {
            if(val instanceof NavigationEnd &&
                val.url != "/auth/login" &&
                typeof localStorage.token == "undefined"
            ){
                Swal.fire({
                    title: "Sua sessão expirou",
                    text: "Faça login novamente",
                    type: "warning",
                    confirmButtonText: "Ok"
                })

                this.router.navigate(['/auth/login']);
            }
        });
    }
}