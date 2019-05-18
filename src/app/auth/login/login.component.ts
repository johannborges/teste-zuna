import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
    form: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private userService: UserService,
        private router: Router
    ){}

    ngOnInit() {
        this.form = this.formBuilder.group({
            username: [null, [
                Validators.required
            ]],

            password: [null, [
                Validators.required,
                Validators.minLength(3)
            ]]
        })
    }

    doLogin(){
        if(this.form.valid){
            let controls = this.form.controls;

            if(this.userService.doLogin(controls.username.value, controls.password.value)){
                this.router.navigate(["/main/list-dragons"]);
            }

            else{
                Swal.fire({
                    title: "Credenciais incorretas",
                    html: "Dica: o usuário é \"<b>teste</b>\", e a senha é \"<b>abc123!@#</b>\".",
                    type: "error"
                });
            }
        }

        else{
            Swal.fire({
                title: "Formulário incompleto",
                html: "Você precisa digitar um usuário.<br>E uma senha de pelo menos 3 caracteres.",
                type: "warning"
            });
        }
    }
}