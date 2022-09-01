import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../Interfaces/project';
import { User } from '../Interfaces/user';
import { UserProject } from '../Interfaces/users-project';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  api = 'http://localhost:5000/users/register'
  userUrl='http://localhost:5000/users/getusers'

  constructor(private http:HttpClient) { }


  registerUser(userCred:any): Observable<User> {
    
    return this.http.post<User>(`${this.api}`,userCred);    
  }

  getUsers():Observable<UserProject[]>{
    return this.http.get<UserProject[]>(this.userUrl)
  }

}
