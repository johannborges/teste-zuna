import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class UserService {
    doLogin(user: String, password: String): Boolean{
        if(user == "teste" && password == "abc123!@#"){
            localStorage.clear();
            localStorage.setItem("token", "as4d6g5asd46g86sadg65sd4g");

            return true;
        }

        else
            return false;
    }
}