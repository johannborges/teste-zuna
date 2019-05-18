import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Estagiario } from 'src/app/models/estagiario.model';
import { EstagiarioService } from 'src/app/services/estagiario.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-estagiario-form',
    templateUrl: './estagiario-form.component.html',
    styleUrls: ['./estagiario-form.component.scss']
})

export class EstagiarioFormComponent implements OnInit {
    form: FormGroup;
    
    id: string;
    estagiario: Estagiario;

    constructor(
        private formBuilder: FormBuilder,
        private estagiarioService: EstagiarioService,
        private activedRoute: ActivatedRoute,
        private router: Router
    ){
        if(this.activedRoute.snapshot.params['id'] !== undefined){
            this.id = this.activedRoute.snapshot.params['id'];
        }
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
        })

        if(this.id){
            this.estagiarioService.getEstagiario(this.id).subscribe((res) => {
                this.estagiario = res;
    
                this.form.controls.name.setValue(this.estagiario.name);
                this.form.controls.email.setValue(this.estagiario.email);
                this.form.controls.cpf.setValue(this.estagiario.cpf);
                this.form.controls.phoneNumber.setValue(this.estagiario.phoneNumber);
            });
        }
    }

    sendForm(){
        if(this.form.valid){
            if(!this.id){
                this.estagiarioService.createEstagiario(
                    this.form.controls.name.value,
                    this.form.controls.email.value,
                    this.form.controls.cpf.value,
                    this.form.controls.phoneNumber.value
                ).subscribe((res) => {
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
                this.estagiarioService.editEstagiario(
                    this.id,
                    this.form.controls.name.value,
                    this.form.controls.email.value,
                    this.form.controls.cpf.value,
                    this.form.controls.phoneNumber.value
                ).subscribe((res) => {
                    Swal.fire({
                        title: "Editado com sucesso!",
                        type: "success"
                    }).then(() => {
                        this.router.navigate(['/main/list-estagiarios']);
                    });
                }, (err) => {
                    console.log(err);
                });
            }
        }

        else{
            let errors = [];

            this.form.controls.email.valid === false ? errors.push(" 'Email'") : null;
            this.form.controls.cpf.valid === false ? errors.push(" 'CPF'") : null;
            this.form.controls.phoneNumber.valid === false ? errors.push(" 'Telefone'") : null;

            errors.join();

            Swal.fire({
                title: "Erro ao cadastrar",
                html: `Os campos<b>${errors}</b> estão preenchidos de forma incorreta`,
                type: "error"
            });
        }
    }
}