import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loginUserDetails } from '../Interfaces/auth.interface';
import { resetPassword } from '../Interfaces/users.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  loginUser(details:loginUserDetails){
    return this.http.post<{error:string, message:string, token:string}>('http://localhost:4500/auth/login', details)
  }

  readToken(token:string){
    return this.http.get<{error:string,message:string, info:{ userId:string, firstName:string, lastName:string,email:string, role:string }}>('http://localhost:4500/auth/check-user-details', {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'token':token
    })
  })


}

resetPassword(password:resetPassword){
  return this.http.put<{error:string, message:string}>('http://localhost:4500/users/reset-password', password)
}

}
