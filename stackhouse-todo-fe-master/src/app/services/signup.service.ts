import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UserSignUp } from '../models/usersignup.model';
import { environment } from 'src/environments/environment';
import { API } from '../app.constants';

@Injectable({ providedIn: 'root' })

export class SignUpService {
    constructor(private http: HttpClient) { }

    register(user: UserSignUp) {
        return this.http.post(environment.API_URL + API.SIGNUP, user);
    }


}