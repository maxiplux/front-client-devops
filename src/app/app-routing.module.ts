import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./core/login/login.component";
import {SearchFlightComponent} from "./features/search-flight/search-flight.component";
import {MainComponent} from "./core/main/main.component";



const routes: Routes = [
  { path: '', redirectTo: '/search', pathMatch: 'full' },
  { path: '', component: MainComponent, children:[
      { path: 'search', component: SearchFlightComponent },
    ]},

  { path: 'login', component: LoginComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
