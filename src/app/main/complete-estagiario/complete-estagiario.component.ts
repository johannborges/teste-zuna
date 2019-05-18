import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Estagiario } from 'src/app/models/estagiario.model';
import { EstagiarioService } from 'src/app/services/estagiario.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-complete-estagiario',
    templateUrl: './complete-estagiario.component.html',
    styleUrls: ['./complete-estagiario.component.scss']
})

export class CompleteEstagiarioComponent implements OnInit {
    form: FormGroup;
    
    id: string;
    estagiario: Estagiario;

    date = new Date();

    year1 = this.date.getFullYear();
    year2 = this.year1 - 17;
    month = this.date.getMonth() + 1 < 9 ? "0" + (this.date.getMonth() + 1) : this.date.getMonth() + 1;
    day = this.date.getDate() < 9 ? "0" + this.date.getDate() : this.date.getDate();

    maxDate = `${this.year2}-${this.month}-${this.day}`;
    minDate = `${this.year1}-${this.month}-${this.day}`;

    constructor(
        private formBuilder: FormBuilder,
        private estagiarioService: EstagiarioService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ){
        this.id = this.activatedRoute.snapshot.params['id'];
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
            ]],

            birthdate: [null, [
                Validators.required
            ]],

            cep: [null, [
                Validators.required,
                Validators.pattern(/^[0-9]{5}-?[0-9]{3}$/)
            ]],

            city: [null, [
                Validators.required
            ]],

            fu: [null, [
                Validators.required
            ]],

            university: [null, [
                Validators.required
            ]],

            course: [null, [
                Validators.required
            ]],

            campus: [null, [
                Validators.required
            ]],

            turn: [null, [
                Validators.required
            ]],

            semester: [null, [
                Validators.required
            ]],

            finishEta: [null, [
                Validators.required
            ]]
        });

        this.estagiarioService.getEstagiario(this.id).subscribe((res) => {
            this.estagiario = res;

            this.form.controls.name.setValue(this.estagiario.name);
            this.form.controls.email.setValue(this.estagiario.email);
            this.form.controls.cpf.setValue(this.estagiario.cpf);
            this.form.controls.phoneNumber.setValue(this.estagiario.phoneNumber);
        });
    }

    sendForm(){
        if(this.form.valid){
            this.estagiarioService.completeEstagiario(
                this.id,
                this.form.controls.name.value,
                this.form.controls.email.value,
                this.form.controls.cpf.value,
                this.form.controls.phoneNumber.value,
                this.form.controls.birthdate.value,
                this.form.controls.cep.value,
                this.form.controls.city.value,
                this.form.controls.fu.value,
                this.form.controls.university.value,
                this.form.controls.course.value,
                this.form.controls.campus.value,
                this.form.controls.turn.value,
                this.form.controls.semester.value,
                this.form.controls.finishEta.value
            ).subscribe(() => {
                Swal.fire({
                    title: "Salvo com sucesso!",
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
            this.form.controls.cep.valid === false ? errors.push(" 'CEP'") : null;

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

            console.log(this.form.controls);
        }
    }
}