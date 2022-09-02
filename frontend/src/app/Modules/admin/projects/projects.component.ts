import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/app/Interfaces/project';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  @Input() project:Project[]=[]
  constructor(private router:Router) { }

  ngOnInit(): void {
  }


  add(){
    this.router.navigate(['admin/add-project'])
  }
  all(){
    this.router.navigate(['admin/view-project'])
  }
}
