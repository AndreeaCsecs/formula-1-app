import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ResultsComponent} from '../app/results/results.component';
import {WinnersComponent} from '../app/winners/winners.component';
import {ContactComponent} from '../app/contact/contact.component';


const routes: Routes = [
  {path:'Results', component: ResultsComponent},
  {path:'Winners', component: WinnersComponent},
  {path:'Contact', component: ContactComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 