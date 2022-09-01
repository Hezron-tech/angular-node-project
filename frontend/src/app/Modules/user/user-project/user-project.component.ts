import { Component, OnInit } from '@angular/core';
import { AllProjects } from 'src/app/Interfaces/project';

@Component({
  selector: 'app-user-project',
  templateUrl: './user-project.component.html',
  styleUrls: ['./user-project.component.css']
})
export class UserProjectComponent implements OnInit {

  project: AllProjects[] = [];

  constructor() { }

  ngOnInit(): void {
  }
completeItem(){
  console.log('projects');
  
}


}
