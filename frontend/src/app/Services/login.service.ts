import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../Interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loginUrl='http://localhost:5000/users/login'
  checkuser='http://localhost:5000/users/checkuser'
  constructor(private http:HttpClient) { }

  login(user:Login):Observable<Login>{
    return this.http.post<Login>(`${this.loginUrl}`,user)
  }

   checkUser():Observable<{username:string,Role:string, email:string}>{
    const token=localStorage.getItem('token') as string
    return this.http.get<{username:string,Role:string, email:string}>(`${this.checkuser}`);{
      headers:new HttpHeaders({token})

    }
   }

  }


// checkuser():Observable<{ name: string, role: string, email: string }>{

//   const token = localStorage.getItem('token') as string

//   return this.http.get<{ name: string, role: string, email: string }>(`${this.checkUrl}`,{

//     headers:new HttpHeaders({token})