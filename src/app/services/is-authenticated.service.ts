import { Injectable } from '@angular/core';
import { Auth } from 'aws-amplify';

let logedIn = {
    status: false,                                      // flag that indicates loged in status
    isAuthenticating: true
}

@Injectable({
  providedIn: 'root'
})

class IsAuthenticatedService {

  isAuthenticated : boolean;

  constructor() { 
     this.isAuthN();                                                      // Try to load current user session
  }
  
  isAuthN = async function() {   

     try{      

         logedIn.isAuthenticating = true;                                 // Indicate that we will try to load session from storage (async)

         await Auth.currentSession();                                     // Load session. Will trow error if there is no user session

         logedIn.status = true;                                           // When await is finished we have valid user session (loged in status)
         logedIn.isAuthenticating = false;
         
         console.log("isAuthN loged in:", logedIn)
     }
   catch(e){                                                              // Catch any error (manly from Auth.currentSession(..)

        console.log("Info:(no current user session avalable)", e);
        
        logedIn.status = false;                                          // Session load failed. (no loged in user found)
        logedIn.isAuthenticating = false;                                // Authentication ended. 
     }

     return logedIn;
  }
  
  AuthNLogout = async function (){

       try{

         let result = await Auth.signOut();  console.log("Loged Out:", result); // try to sign out (clear user sesession information from storage )
         logedIn.status = false;                                                // indicate that user is not loged in
       }
       catch(e){
          alert("Sign Out error: " + e);
       }
  }
   
}

export { IsAuthenticatedService, logedIn };