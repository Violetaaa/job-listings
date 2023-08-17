import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth) {

  }

  register(user: User): any {
    return createUserWithEmailAndPassword(this.auth, user.email, user.password);
  }
}

