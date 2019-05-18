import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { EstagiarioService } from 'src/app/services/estagiario.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-create-estagiario',
    templateUrl: './create-estagiario.component.html',
    styleUrls: ['./create-estagiario.component.scss']
})

export class CreateEstagiarioComponent implements OnInit {
    form: FormGroup;
    
    constructor(
        private formBuilder: FormBuilder,
        private estagiarioService: EstagiarioService,
        private router: Router
    ){
    }

    ngOnInit(){
        this.form = this.formBuilder.group({
            name: [null, [
                Validators.required
            ]],

            email: [null, [
                Validators.required,
                Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
            ]],

            cpf: [null, [
                Validators.required,
                Validators.pattern(/^[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}$/)
            ]],

            phoneNumber: [null, [
                Validators.required,
                Validators.pattern(/^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}$/)
            ]]
        });
    }

    sendForm(){
        if(this.form.valid){
            this.estagiarioService.createEstagiario(
                this.form.controls.name.value,
                this.form.controls.email.value,
                this.form.controls.cpf.value,
                this.form.controls.phoneNumber.value
            ).subscribe(() => {
                Swal.fire({
                    title: "Cadastrado com sucesso!",
                    type: "success"
                }).then(() => {
                    this.router.navigate(['/main/list-estagiarios']);
                });
            }, (err) => {
                console.log(err);
            });
        }

        else{
            let errors = [];

            this.form.controls.email.valid === false ? errors.push(" 'Email'") : null;
            this.form.controls.cpf.valid === false ? errors.push(" 'CPF'") : null;
            this.form.controls.phoneNumber.valid === false ? errors.push(" 'Telefone'") : null;

            errors.join();

            if(errors.length > 0){
                Swal.fire({
                    title: "Erro ao salvar",
                    html: `Os campos<b>${errors}</b> estão preenchidos de forma incorreta`,
                    type: "error"
                });
            }
            else{
                Swal.fire({
                    title: "Erro ao salvar",
                    html: `Todos os campos devem ser preenchidos`,
                    type: "error"
                });
            }
        }
    }
}