import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { from } from 'rxjs';
import { Credentials } from '../interfaces/credentials';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    // Use this to get the active user
    user$ = authState(this.auth);

    constructor(private auth: Auth) {}

    //Use this to authenticate a user w/ their credentials
    login(credentials: Credentials) {
        return from(
            signInWithEmailAndPassword(
                this.auth,
                credentials.email,
                credentials.password
            )
        );
    }

    // Use this to sign the user out with Firebase
    logout() {
        return from(signOut(this.auth));
    }

    // Use this to create a new account w/ credentials
    createAccount(credentials: Credentials) {
        return createUserWithEmailAndPassword(
            this.auth,
            credentials.email,
            credentials.password
        )
    };
}