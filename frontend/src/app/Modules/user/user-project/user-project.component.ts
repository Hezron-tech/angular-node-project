import { Component, OnInit } from '@angular/core';
import { AllProjects } from 'src/app/Interfaces/project';
import { NewProject } from 'src/app/Interfaces/user';
// import { UserProject } from 'src/app/Interfaces/users-project';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-user-project',
  templateUrl: './user-project.component.html',
  styleUrls: ['./user-project.component.css'],
})
export class UserProjectComponent implements OnInit {
  proje: NewProject[] = [];

  // names: string | null = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const names = localStorage.getItem('user_id')?? '';

     this.getProject(names)
  }
  completeItem() {
    console.log('projects');
  }

  getProject(user_id:string) {
    this.userService.fetchProject(user_id).subscribe((data) => {
      console.log(data);
        this.proje=data
    });
  }


  update(id:string){

    this.userService.updateproject(id).subscribe(data=>{
      console.log(data);
      
    })
  }
}
