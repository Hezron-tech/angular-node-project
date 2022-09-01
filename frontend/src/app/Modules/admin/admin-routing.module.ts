import { ViewProjectComponent } from './view-project/view-project.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProjectComponent } from './add-project/add-project.component';
import { ProjectsComponent } from './projects/projects.component';

const routes: Routes = [
  {path: 'dashboard', component: ProjectsComponent},

  {
    path:'add-project', component:AddProjectComponent
  },
  {
    path:'view-project', component:ViewProjectComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
