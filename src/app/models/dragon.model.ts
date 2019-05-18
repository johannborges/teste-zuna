export class Dragon{
    id: number;
    createdAt: string;
    name: string;
    type: string;

    constructor(
        id: number,
        name: string,
        createdAt: string,
        type: string
    ){
        this.id = id;
        this.name = name;
        this.createdAt = createdAt;
        this.type = type;
    }
}