import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [

{path:'',component:HomeComponent},
{path:'admin', loadChildren:()=> import('./Modules/admin/admin.module').then(mod=>mod.AdminModule)},
{ path: 'auth', loadChildren: () => import('./Modules/auth/auth.module').then(m=>m.AuthModule)}]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
