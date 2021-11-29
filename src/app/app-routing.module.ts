import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './covid/home/home.component';
import { CountryComponent } from './covid/country/country.component';
import { TamilnaduComponent } from './covid/tamilnadu/tamilnadu.component';

const routes: Routes = [
  // {path: 'index', component: HomeComponent},
  {path: 'country/:id', component: CountryComponent},
  {path: 'tamilnadu', component: TamilnaduComponent},
  {path: '', component: HomeComponent},
  // {path: '', redirectTo : '',pathMatch:'full'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
