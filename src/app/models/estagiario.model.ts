export class Estagiario{
    id: number;
    name: string;
    email: string;
    cpf: string;
    phoneNumber: string;

    constructor(
        id: number,
        name: string,
        email: string,
        cpf: string,
        phoneNumber: string
    ){
        this.id = id;
        this.name = name;
        this.email = email;
        this.cpf = cpf;
        this.phoneNumber = phoneNumber;
    }
}