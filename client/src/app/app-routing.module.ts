import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = 

[{ path: 'login', loadChildren: () => import('./Modules/auth/login/login.module').then(m => m.LoginModule) },
 { path: 'registration', loadChildren: () => import('./Modules/auth/registration/registration.module').then(m => m.RegistrationModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
