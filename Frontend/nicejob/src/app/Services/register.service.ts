import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { registerUser } from '../Interfaces/register.interface';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http:HttpClient) { }

  registerUser(userDetails:registerUser){
    return this.http.post<{message:string, error:string}>('http://localhost:4500/users/register', userDetails)
  }

}
