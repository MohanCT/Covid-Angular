import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule, Meta } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './covid/home/home.component';
import { HeaderComponent } from './covid/header/header.component';
import { CountryComponent } from './covid/country/country.component';
import { TamilnaduComponent } from './covid/tamilnadu/tamilnadu.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    CountryComponent,
    TamilnaduComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [Meta],
  bootstrap: [AppComponent]
})
export class AppModule { }
