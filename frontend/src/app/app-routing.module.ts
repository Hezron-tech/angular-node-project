import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [

{path:'',component:HomeComponent},
{path:'admin', loadChildren:()=> import('./Modules/admin/admin.module').then(mod=>mod.AdminModule)},
{path:'user', loadChildren:()=> import('./Modules/user/user.module').then(mod=>mod.UserModule)},

{ path: 'auth', loadChildren: () => import('./Modules/auth/auth.module').then(m=>m.AuthModule)},
{ path: '**', component: ErrorComponent, pathMatch: 'full' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
