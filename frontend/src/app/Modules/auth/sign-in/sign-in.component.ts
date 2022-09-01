import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  email!:string
  password!:string


  @ViewChild ('form') form!:NgForm;
  constructor(private loginService:LoginService,private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.form.value);
    const user=this.form.value

    this.loginService.login(user).subscribe(

      (response)=>{
        console.log(response);
        response.token? localStorage.setItem('token',response.token): ''

        this.redirect()
         
      },
      (error)=>console.log(error),
      ()=>console.log('succesfully log in')
      
      
    )
    

  }
  redirect(){

    const token = localStorage.getItem('token') as string

    this.loginService.checkUser().subscribe(

      (response)=>{

        console.log(response);

        localStorage.setItem('name', response.username)

        localStorage.setItem('email', response.email)

        localStorage.setItem('role', response.Role)



        if (response.Role === 'admin') {

          this.router.navigate(['/admin/dashboard'])



      } else {

        this.router.navigate(['/user/user-dashboard'])

      }

        

      }

    )

  }
  

}
