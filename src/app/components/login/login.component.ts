import { Component, OnInit } from '@angular/core';
import { Auth } from  'aws-amplify';
import {  IsAuthenticatedService } from '../../services/is-authenticated.service';
import { Router } from '@angular/router';
let state = {
  email: "",
  password: ""
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  
  private state: any = state;                         // set reference to state variable

  isAuthenticated = new IsAuthenticatedService();    // get instance of Authentication management service

  constructor(private router: Router){

  }

  login = async (event: any) => {          // tries to login with given credentials (cognito user pool), then loads session information from storage
           
         console.log("Logging in ...")
         event.preventDefault()           // prevents default browser action when pressing submit button

         try{
               console.log("With credentials \n email:", this.state.email, "\n password", this.state.password);

               let result = await Auth.signIn(this.state.email, this.state.password) // check user un user pool with given credentials
                  console.log("Result:", result);
               alert("Loged in");
               
               this.isAuthenticated.isAuthN();       // user has been checked in user pool 
               this.router.navigateByUrl('/');       // navigate to root (with current routing in app.module.ts will load the HomeComponent) 
         }
         catch(e){

              alert("Error: " + e.message); 
              this.isAuthenticated.isAuthN();       // there's been an error so update logedIn status accordingly
              
         }
           
  }

  ngOnInit(){
    
  }
 
  onSubmit = function(event: any){
    this.login(event);
  }
}
