import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainHeaderComponent } from './pages/main-header/main-header.component';
import { LeftBarComponent } from './pages/left-bar/left-bar.component';
import { FooterBarComponent } from './pages/footer-bar/footer-bar.component';
import { SearchFlightComponent } from './features/search-flight/search-flight.component';
import { LoginComponent } from './core/login/login.component';
import { MainComponent } from './core/main/main.component';

import { DataTablesModule } from "angular-datatables";
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';

import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [

    AppComponent,
    MainHeaderComponent,
    LeftBarComponent,
    FooterBarComponent,
    SearchFlightComponent,
    LoginComponent,
    MainComponent,

  ],
  imports: [
    BrowserModule,

    AppRoutingModule,DataTablesModule, GraphQLModule, HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
