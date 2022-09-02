import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { UserProject } from '../Interfaces/users-project';
import { NewProject } from '../Interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl='http://localhost:5000/projects/'
  userUrl=''

  constructor(private http:HttpClient) { }

  fetchProject(user_id:string):Observable<NewProject[]>{
    // const id=localStorage.getItem('id') as string

    return this.http.get<NewProject[]>(`${this.baseUrl}${user_id}`)
  }


  updateproject(id:string){

    return this.http.put<any>(`${this.baseUrl}${id}`,id)

  }
  

}
