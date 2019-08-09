import { Component, OnInit } from '@angular/core';
import AWS, { Auth } from  'aws-amplify';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private state: any

  constructor(){
     this.state = {
        email: "",
        password: ""
     };
      

  }

  login = async (event: { preventDefault: () => void; }) => {

         event.preventDefault()        // prevents default drowser action when pressing submit button
         try{
               console.log("email:", this.state.email, "\n password", this.state.password);

               await Auth.signIn(this.state.email, this.state.password)
               console.log("Loged in");


         }
         catch(e){
              alert("Error: " + e.message) 
         }
           
  }
      
  
  ngOnInit(){
    
  }

}
