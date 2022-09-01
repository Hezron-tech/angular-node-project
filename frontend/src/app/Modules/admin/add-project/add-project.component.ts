import { RegisterService } from 'src/app/Services/register.service';
//import { UserProject } from './../../../Interfaces/users-project';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectsService } from 'src/app/Services/projects.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UserProject } from 'src/app/Interfaces/users-project';
import { Project } from 'src/app/Interfaces/project';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  user$:Observable<UserProject[]>=new Observable()

  projectForms!: FormGroup;

  constructor(private projectService:ProjectsService,private fb:FormBuilder,private router:Router,private registerService:RegisterService ) { }

  ngOnInit(): void {

    console.log(this.allUsers());
    

    this.projectForms=this.fb.group({
      name:[null,[Validators.required]],
      description:[null,[Validators.required]],
      date:[null,[Validators.required]],
      user_id:[null,[Validators.required]], 
    })
  }

  addProject(){
   
    this.projectService.postProject(this.projectForms.value).subscribe(response=>{
      console.log(response);

      this.router.navigate(['admin/add-project'])
      
      
    })
  }

  allUsers(){

    console.log(this.registerService.getUsers());
    
    this.user$=this.registerService.getUsers()

    console.log(this.user$);
    
  }

}
// onAdd(){
//   this.service.addProject(this.addForms.value).subscribe(response=>{
//   console.log(response);
//   this.router.navigate(['admin/assigned'])
//   })
//   }
//   onget(){
//    this.user$= this.auth.getUsers()
//   }