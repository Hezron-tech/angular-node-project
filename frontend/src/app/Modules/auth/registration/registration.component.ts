import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Interfaces/user';
import { RegisterService } from 'src/app/Services/register.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  addForms!: FormGroup;
  registrationSuccess=false

  constructor(private fb:FormBuilder,private registerService:RegisterService,private router:Router) { }

  ngOnInit(): void {

    this.addForms = this.fb.group({
      username:[null,[Validators.required]],
      email: [null,[Validators.required,Validators.pattern('^[A-Za-z0-9._%+-]+@thejitu.com$'),]],
      password: [null,[Validators.required, Validators.minLength(6), this.checkPassword] ],
     
    });
  }

  addUser(){
    if(this.addForms.valid){
    const  newRegistration:User = this.addForms.value;
    console.log(newRegistration);
    
   this.registerService.registerUser(newRegistration).subscribe(
     (response) => {

      console.log(response);
      this.registrationSuccess=true
      if(this.registrationSuccess){
        this.router.navigate(['auth/login'])

      }else{
        alert('user already registered')
      }
      
      
     },
     (error) => console.log(error),
     () => console.log("User added successfully")
     
     
   );
    }
  }


  checkPassword(control:FormControl){
    const value=control.value
     const special=/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~"]+/.test(value)
     return !special? {special:true} :null
 
     
   }

}
