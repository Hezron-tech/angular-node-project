import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AllProjects, Project } from '../Interfaces/project';
import { UserProject } from '../Interfaces/users-project';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  baseurl = 'http://localhost:5000/projects/create';
  userurl = 'http://localhost:5000/users/getUsers';

  delUrl = 'http://localhost:5000/projects';

  projectsUrl = 'http://localhost:5000/projects/all';

  private httpOptions: any;

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-type': 'Application-json' }),
      observe: 'body',
    };
  }

  postProject(data: Project): Observable<any> {
    return this.http.post<any>(this.baseurl + '', data);
  }

  getProjects(): Observable<any> {
    return this.http.get<any>(`${this.projectsUrl}`);
  }

  deleteProject(id: string) {
    return this.http.delete(this.delUrl + '/' + id);
  }
}
