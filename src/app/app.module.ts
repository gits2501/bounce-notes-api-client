import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { FormsModule } from "@angular/forms";
import { AppComponent } from './app.component';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NotfoundComponent } from './components/notfound/notfound.component';

import Amplify  from  'aws-amplify';
import config from './config';

const appRoutes: Routes = [ // define routes

   { path:'', component: HomeComponent},
   { path:'login', component: LoginComponent },
   { path:'**', component: NotfoundComponent}
   // { path:'signup'},
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotfoundComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    CollapseModule.forRoot(),
    FormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 

   
   constructor(){
    Amplify.configure({
       Auth: {
           mandatorySignIn: true,
           region: config.cognito.REGION,
           userPoolId: config.cognito.USER_POOL_ID,
           identityPoolId: config.cognito.IDENTITY_POOL_ID,
           userPoolWebClientId: config.cognito.APP_CLIENT_ID
       },
       Storage: {
           region: config.s3.REGION,
           bucket: config.s3.BUCKET,
           identityPoolId: config.cognito.IDENTITY_POOL_ID
       },
       API: {
          endpoints: [
            {
              name: "notes",
              endpoint: config.apiGateway.URL,
              region: config.apiGateway.REGION
            },
          ]
       }
    });
   
  }

}
