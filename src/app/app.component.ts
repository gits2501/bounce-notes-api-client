import { Component} from '@angular/core';
import { IsAuthenticatedService, logedIn } from './services/is-authenticated.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
   isCollapsed = true;
   private isLogedIn : any = logedIn;

   constructor(){
     console.log('isAuthenticated :', this.isAuthenticated);
      console.log("Loged in:", this.isLogedIn)

      this.isLogedIn = logedIn;
   }
   
   isAuthenticated = new IsAuthenticatedService();
}

