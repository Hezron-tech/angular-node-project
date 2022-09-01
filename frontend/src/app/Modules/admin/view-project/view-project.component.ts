import { Project } from './../../../Interfaces/project';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AllProjects } from 'src/app/Interfaces/project';
import { ProjectsService } from 'src/app/Services/projects.service';

@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.css'],
})
export class ViewProjectComponent implements OnInit {
  project: AllProjects[] = [];
  constructor(private projectService: ProjectsService) {}

  ngOnInit(): void {
    this.loadProject();
  }

  loadProject() {
    this.projectService.getProjects().subscribe((response) => {
      this.project = response;

      console.log(this.project);
    });
  }

  deleteItem(projectid: string) {
    this.projectService.deleteProject(projectid).subscribe((response) => {
      // this.project=this.project.filter(item=>item.id !==project.id)
      this.loadProject();
      console.log(projectid);

      console.log(response);
    });
  }

  //   deleteProject(id:number) {
  //     this.projectService.deleteProject(id).subscribe(result => {
  // this.loadProject()

  //     })
}

// this.service.showProject().subscribe(response=>{
//   this.project=response

// })
// }
